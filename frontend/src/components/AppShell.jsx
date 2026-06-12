import { Avatar } from './Avatar.jsx';
import { Icon } from './Icon.jsx';

export function AppShell({
  activeView,
  currentUser,
  isAuthenticated,
  onChangeView,
  onLogin,
  onLogout,
  onToggleTheme,
  theme,
  children,
}) {
  const displayName = currentUser?.username || 'Guest';

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div>
          <span className="eyebrow">Recipe Social Media</span>
          <h1>Feed</h1>
        </div>

        <div className="profile-box">
          <Avatar imageUrl={currentUser?.profile_picture} label={displayName} />
          <div>
            <strong>{displayName}</strong>
            <span>{currentUser?.email || 'Read-only browsing'}</span>
          </div>
        </div>

        {isAuthenticated ? (
          <nav className="side-nav" aria-label="Main navigation">
            <button
              type="button"
              className={activeView === 'feed' ? 'active' : ''}
              onClick={() => onChangeView('feed')}
            >
              <Icon name="feed" />
              Posts
            </button>
            <button
              type="button"
              className={activeView === 'profile' ? 'active' : ''}
              onClick={() => onChangeView('profile')}
            >
              <Icon name="user" />
              Profile
            </button>
          </nav>
        ) : null}

        {isAuthenticated ? (
          <button
            type="button"
            className="secondary-button session-button"
            onClick={onLogout}
          >
            <Icon name="logout" />
            Logout
          </button>
        ) : (
          <button
            type="button"
            className="secondary-button session-button"
            onClick={onLogin}
          >
            <Icon name="login" />
            Login
          </button>
        )}

        <button
          type="button"
          className="secondary-button theme-button"
          onClick={onToggleTheme}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </button>
      </aside>

      <main className="app-main">{children}</main>
    </div>
  );
}
