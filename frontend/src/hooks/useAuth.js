import { useEffect, useState } from 'react';
import { graphqlRequest } from '../api.js';
import {
  DELETE_USER_MUTATION,
  LOGIN_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  UPDATE_USER_MUTATION,
} from '../graphql/documents.js';

const tokenStorageKey = 'recipe-social-token';

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => {
    return window.localStorage.getItem(tokenStorageKey) || '';
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const decodedToken = token ? decodeToken(token) : null;
  const userId = decodedToken?.user_id ? String(decodedToken.user_id) : '';

  useEffect(() => {
    const url = new URL(window.location.href);
    const oauthToken = url.searchParams.get('token');

    if (!oauthToken) return;

    setToken(oauthToken);
    url.searchParams.delete('token');
    window.history.replaceState({}, document.title, url.toString());
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem(tokenStorageKey, token);
    } else {
      window.localStorage.removeItem(tokenStorageKey);
      setCurrentUser(null);
    }
  }, [token]);

  useEffect(() => {
    let active = true;

    if (!token || !userId) return undefined;

    refreshCurrentUser(active);

    return () => {
      active = false;
    };
  }, [token, userId]);

  async function refreshCurrentUser(active = true) {
    if (!token || !userId) return null;

    const data = await graphqlRequest(ME_QUERY, { user_id: userId }, token)
      .then((data) => {
        if (active) {
          setCurrentUser(data.user);
        }

        return data;
      })
      .catch(() => {
        if (active) {
          setCurrentUser(null);
        }

        return null;
      });

    return data?.user || null;
  }

  async function login(credentials, options = {}) {
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const data = await graphqlRequest(LOGIN_MUTATION, credentials);
      const nextToken = data.login?.token;

      if (!nextToken) {
        throw new Error('We could not sign you in. Please check your email and password.');
      }

      setToken(nextToken);
      return nextToken;
    } catch (error) {
      if (!options.silentError) {
        setAuthError(error.message);
      }
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function signup(user) {
    setIsAuthLoading(true);
    setAuthError('');

    try {
      await graphqlRequest(REGISTER_MUTATION, { user });
      return await login({
        email: user.email,
        password: user.password,
      }, { silentError: true });
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }

  function logout() {
    setToken('');
    setAuthError('');
  }

  async function updateProfile(user) {
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const payload = Object.fromEntries(
        Object.entries(user).filter(([, value]) => value !== '')
      );
      const data = await graphqlRequest(
        UPDATE_USER_MUTATION,
        { user: payload },
        token
      );

      setCurrentUser(data.updateUser);
      return data.updateUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function deleteAccount() {
    setIsAuthLoading(true);
    setAuthError('');

    try {
      await graphqlRequest(DELETE_USER_MUTATION, { user_id: userId }, token);
      logout();
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }

  return {
    authError,
    currentUser,
    deleteAccount,
    isAuthenticated: Boolean(token),
    isAuthLoading,
    login,
    logout,
    refreshCurrentUser,
    signup,
    token,
    updateProfile,
    userId,
  };
}
