import { Avatar } from './Avatar.jsx';
import { Icon } from './Icon.jsx';
import { LoadingIndicator } from './LoadingIndicator.jsx';
import { RecipeCard } from './RecipeCard.jsx';
import { useState } from 'react';

export function PublicProfileView({
  commentsByRecipe,
  currentUserId,
  isLoading,
  onAddComment,
  onBack,
  onDeleteRecipe,
  onLoadComments,
  onToggleLike,
  onUpdateRecipe,
  onViewProfile,
  profileError,
  profileRecipes,
  profileUser,
  tags,
}) {
  const [layout, setLayout] = useState('list');

  return (
    <section className="public-profile-page">
      <header className="section-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h2>{profileUser?.username || 'User profile'}</h2>
        </div>
        <button type="button" className="secondary-button" onClick={onBack}>
          <Icon name="back" />
          Back to feed
        </button>
      </header>

      {profileError ? <p className="form-error">{profileError}</p> : null}
      {isLoading ? <LoadingIndicator label="Loading profile..." /> : null}

      {profileUser ? (
        <section className="public-profile-card">
          <Avatar
            className="profile-avatar"
            imageUrl={profileUser.profile_picture}
            label={profileUser.username}
          />
          <div className="public-profile-content">
            <h3>{profileUser.username}</h3>
            <div className="profile-bio compact">
              <span>Bio</span>
              <p>{profileUser.bio || 'No bio yet.'}</p>
            </div>
            <span>{profileRecipes.length} posts</span>
          </div>
        </section>
      ) : null}

      <div className="profile-feed-toolbar">
        <span>{profileRecipes.length} recipes</span>
        <div className="layout-toggle" aria-label="Profile recipe layout">
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

      <div className={`post-list post-list-${layout} profile-post-list`}>
        {profileRecipes.map((recipe, index) => (
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
            onViewProfile={onViewProfile}
          />
        ))}

        {!isLoading && profileUser && profileRecipes.length === 0 ? (
          <p className="empty-feed">This user has not posted recipes yet.</p>
        ) : null}
      </div>
    </section>
  );
}
