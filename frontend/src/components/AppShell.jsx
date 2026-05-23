import { Avatar } from './Avatar.jsx';
import { Icon } from './Icon.jsx';

export function AppShell({
  activeView,
  currentUser,
  onChangeView,
  onLogout,
  onToggleTheme,
  theme,
  children,
}) {
  const displayName = currentUser?.username || 'User';
  const navigation = [
    { id: 'feed', label: 'Posts', icon: 'feed' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];

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
            <span>{currentUser?.email || 'Authenticated'}</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeView === item.id ? 'active' : ''}
              onClick={() => onChangeView(item.id)}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="secondary-button" onClick={onLogout}>
          <Icon name="logout" />
          Logout
        </button>

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
