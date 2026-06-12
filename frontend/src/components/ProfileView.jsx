import { useEffect, useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';
import { Icon } from './Icon.jsx';
import { LoadingIndicator } from './LoadingIndicator.jsx';
import { RecipeCard } from './RecipeCard.jsx';

export function ProfileView({
  commentsByRecipe,
  currentUser,
  currentUserId,
  isLoading,
  isRecipesLoading,
  onAddComment,
  onDeleteAccount,
  onDeleteRecipe,
  onLoadComments,
  onToggleLike,
  onUpdateProfile,
  onUpdateRecipe,
  profileError,
  recipes = [],
  tags = [],
}) {
  const [layout, setLayout] = useState('list');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    profile_picture: '',
    bio: '',
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: '',
      profile_picture: currentUser?.profile_picture || '',
      bio: currentUser?.bio || '',
    });
  }, [currentUser]);

  async function submitProfile(event) {
    event.preventDefault();
    setMessage('');

    try {
      await onUpdateProfile(form);
      setForm((current) => ({ ...current, password: '' }));
      setMessage('Profile updated.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteAccount() {
    try {
      await onDeleteAccount();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="profile-page">
      <ConfirmDialog
        confirmLabel="Delete account"
        isOpen={isDeleteDialogOpen}
        message="This will delete your account and the recipes created by it. This action cannot be undone."
        title="Delete your account?"
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={deleteAccount}
      />

      <header className="section-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h2>Your account</h2>
        </div>
      </header>

      {message ? <p className="inline-status">{message}</p> : null}
      {profileError ? <p className="form-error">{profileError}</p> : null}

      <div className="profile-layout">
        <section className="profile-card">
          <Avatar
            className="profile-avatar"
            imageUrl={currentUser?.profile_picture}
            label={currentUser?.username || 'User'}
          />
          <h3>{currentUser?.username || 'User'}</h3>
          <p>{currentUser?.email}</p>
          <div className="profile-bio">
            <span>Bio</span>
            <p>{currentUser?.bio || 'No bio yet.'}</p>
          </div>
        </section>

        <form className="profile-form" onSubmit={submitProfile}>
          <Field
            label="Username"
            value={form.username}
            required
            onChange={(value) =>
              setForm((current) => ({ ...current, username: value }))
            }
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            required
            onChange={(value) =>
              setForm((current) => ({ ...current, email: value }))
            }
          />
          <Field
            label="New password"
            type="password"
            value={form.password}
            onChange={(value) =>
              setForm((current) => ({ ...current, password: value }))
            }
          />
          <Field
            label="Avatar URL"
            value={form.profile_picture}
            onChange={(value) =>
              setForm((current) => ({ ...current, profile_picture: value }))
            }
          />
          <Field
            label="Bio"
            value={form.bio}
            textarea
            onChange={(value) =>
              setForm((current) => ({ ...current, bio: value }))
            }
          />

          <div className="profile-actions">
            <button type="submit" disabled={isLoading}>
              <Icon name="save" />
              {isLoading ? 'Saving...' : 'Save profile'}
            </button>
            <button
              type="button"
              className="danger-button"
              disabled={isLoading}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Icon name="trash" />
              Delete account
            </button>
          </div>
        </form>
      </div>

      <section className="profile-recipes-section">
        <div className="profile-feed-toolbar">
          <div>
            <span className="eyebrow">Your posts</span>
            <strong>{recipes.length} recipes</strong>
          </div>
          <div className="layout-toggle" aria-label="Your recipe layout">
            <button
              type="button"
              className={layout === 'list' ? 'active' : ''}
              onClick={() => setLayout('list')}
            >
              <Icon name="list" />
              List
            </button>
            <button
              type="button"
              className={layout === 'grid' ? 'active' : ''}
              onClick={() => setLayout('grid')}
            >
              <Icon name="grid" />
              Grid
            </button>
          </div>
        </div>

        {isRecipesLoading ? (
          <LoadingIndicator label="Loading your recipes..." />
        ) : null}

        <div className={`post-list post-list-${layout} profile-post-list`}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              comments={commentsByRecipe[recipe.id]}
              currentUserId={currentUserId}
              layout={layout}
              recipe={recipe}
              style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
              tags={tags}
              onAddComment={onAddComment}
              onDeleteRecipe={onDeleteRecipe}
              onLoadComments={onLoadComments}
              onToggleLike={onToggleLike}
              onUpdateRecipe={onUpdateRecipe}
              onViewProfile={() => {}}
            />
          ))}

          {!isRecipesLoading && recipes.length === 0 ? (
            <p className="empty-feed">You have not posted recipes yet.</p>
          ) : null}
        </div>
      </section>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  textarea = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <label className="field">
      <span>
        {label}
        {required ? <em aria-hidden="true">*</em> : null}
      </span>
      {textarea ? (
        <textarea
          rows="5"
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <span className={isPassword ? 'password-input-wrap' : undefined}>
          <input
            type={inputType}
            value={value}
            required={required}
            onChange={(event) => onChange(event.target.value)}
          />
          {isPassword ? (
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          ) : null}
        </span>
      )}
    </label>
  );
}
