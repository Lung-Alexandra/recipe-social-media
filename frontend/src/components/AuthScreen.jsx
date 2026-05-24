import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';

const emptySignupForm = {
  username: '',
  email: '',
  password: '',
  profile_picture: '',
  bio: '',
};

export function AuthScreen({
  isLoading,
  onLogin,
  onSignup,
  onToggleTheme,
  theme,
}) {
  const [mode, setMode] = useState('login');
  const [errors, setErrors] = useState({ login: '', signup: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState(emptySignupForm);
  const currentError = errors[mode];

  useEffect(() => {
    if (!currentError) return undefined;

    const clearTimer = window.setTimeout(() => {
      setErrors((current) => ({ ...current, [mode]: '' }));
    }, 10000);

    return () => window.clearTimeout(clearTimer);
  }, [currentError, mode]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setErrors({ login: '', signup: '' });
  }

  async function submitLogin(event) {
    event.preventDefault();
    setErrors((current) => ({ ...current, login: '' }));

    try {
      await onLogin(loginForm);
    } catch {
      setErrors((current) => ({
        ...current,
        login:
          'We could not sign you in. Please check your email and password.',
      }));
    }
  }

  async function submitSignup(event) {
    event.preventDefault();
    setErrors((current) => ({ ...current, signup: '' }));

    try {
      await onSignup({
        ...signupForm,
        profile_picture: signupForm.profile_picture || null,
        bio: signupForm.bio || null,
      });
      setSignupForm(emptySignupForm);
    } catch (error) {
      setErrors((current) => ({
        ...current,
        signup: getSignupErrorMessage(error),
      }));
    }
  }

  function continueWithGoogle() {
    window.location.assign('/auth/google');
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <header className="auth-topbar">
          <div>
            <span className="eyebrow">Recipe Social Media</span>
            <strong>Cook. Share. React.</strong>
          </div>
          <button
            type="button"
            className="secondary-button auth-theme-button"
            onClick={onToggleTheme}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </header>

        <div className="auth-copy">
          <div className="auth-orb" aria-hidden="true">
            <span />
          </div>
          <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
          <p>
            Sign in to explore the recipe feed, publish posts, and interact
            with likes or comments.
          </p>
          <div className="auth-highlights">
            <span>Live feed</span>
            <span>Likes & comments</span>
            <span>Recipe profiles</span>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="segmented-control" aria-label="Auth mode">
            <button
              type="button"
              className={mode === 'login' ? 'active' : ''}
              onClick={() => changeMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === 'signup' ? 'active' : ''}
              onClick={() => changeMode('signup')}
            >
              Sign up
            </button>
          </div>

          {mode === 'login' ? (
            <form className="stack-form" onSubmit={submitLogin}>
              <button
                type="button"
                className="secondary-button oauth-button"
                onClick={continueWithGoogle}
              >
                <Icon name="google" />
                Continue with Google
              </button>
              <div className="auth-divider">
                <span>or use email</span>
              </div>
              <Field
                label="Email"
                type="email"
                value={loginForm.email}
                onChange={(value) =>
                  setLoginForm((current) => ({ ...current, email: value }))
                }
                required
              />
              <Field
                label="Password"
                type="password"
                value={loginForm.password}
                onChange={(value) =>
                  setLoginForm((current) => ({ ...current, password: value }))
                }
                required
              />
              <button type="submit" disabled={isLoading}>
                <Icon name="login" />
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="stack-form" onSubmit={submitSignup}>
              <button
                type="button"
                className="secondary-button oauth-button"
                onClick={continueWithGoogle}
              >
                <Icon name="google" />
                Continue with Google
              </button>
              <div className="auth-divider">
                <span>or create with email</span>
              </div>
              <Field
                label="Username"
                value={signupForm.username}
                onChange={(value) =>
                  setSignupForm((current) => ({ ...current, username: value }))
                }
                required
              />
              <Field
                label="Email"
                type="email"
                value={signupForm.email}
                onChange={(value) =>
                  setSignupForm((current) => ({ ...current, email: value }))
                }
                required
              />
              <Field
                label="Password"
                type="password"
                value={signupForm.password}
                onChange={(value) =>
                  setSignupForm((current) => ({ ...current, password: value }))
                }
                required
              />
              <button type="submit" disabled={isLoading}>
                <Icon name="userPlus" />
                {isLoading ? 'Loading...' : 'Create account'}
              </button>
            </form>
          )}
          
        </div>
        <div
          className="auth-error"
          role="alert"
          style={{
            minHeight: '1.5em',
            visibility: currentError ? 'visible' : 'hidden',
          }}
        >
          {currentError ? <p className="form-error">{currentError}</p> : null}
        </div>
      </section>
    </main>
  );
}

function getSignupErrorMessage() {
  return 'We could not create your account. Please check the details and try again.';
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  textarea = false,
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <em aria-hidden="true">*</em> : null}
      </span>
      {textarea ? (
        <textarea
          rows="4"
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
