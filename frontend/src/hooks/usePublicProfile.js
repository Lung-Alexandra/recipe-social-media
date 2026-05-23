import { useState } from 'react';
import { graphqlRequest } from '../api.js';
import { USER_PROFILE_QUERY } from '../graphql/documents.js';

export function usePublicProfile(token) {
  const [profileUser, setProfileUser] = useState(null);
  const [profileRecipes, setProfileRecipes] = useState([]);
  const [profileError, setProfileError] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  async function loadProfile(userId) {
    setIsProfileLoading(true);
    setProfileError('');

    try {
      const data = await graphqlRequest(
        USER_PROFILE_QUERY,
        { user_id: String(userId), limit: 50 },
        token
      );

      setProfileUser(data.user);
      setProfileRecipes(data.userRecipes || []);
    } catch (error) {
      setProfileError(error.message);
    } finally {
      setIsProfileLoading(false);
    }
  }

  function updateProfileRecipe(recipe) {
    setProfileRecipes((current) =>
      current.map((entry) => {
        if (entry.id !== recipe.id) return entry;

        const userLiked = !entry.userLiked;
        const likeCount = Math.max(
          0,
          (entry.likeCount || 0) + (userLiked ? 1 : -1)
        );

        return { ...entry, userLiked, likeCount };
      })
    );
  }

  function replaceProfileRecipe(recipe) {
    setProfileRecipes((current) =>
      current.map((entry) => (entry.id === recipe.id ? recipe : entry))
    );
  }

  function removeProfileRecipe(recipeId) {
    setProfileRecipes((current) =>
      current.filter((entry) => String(entry.id) !== String(recipeId))
    );
  }

  return {
    isProfileLoading,
    loadProfile,
    profileError,
    profileRecipes,
    profileUser,
    removeProfileRecipe,
    replaceProfileRecipe,
    updateProfileRecipe,
  };
}
