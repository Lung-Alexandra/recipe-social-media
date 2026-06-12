import { Icon } from './Icon.jsx';
import { LoadingIndicator } from './LoadingIndicator.jsx';
import { RecipeCard } from './RecipeCard.jsx';
import { useEffect, useState } from 'react';

export function FeedView({
  commentsByRecipe,
  currentUserId,
  feedError,
  filters,
  isLoading,
  isAuthenticated,
  onAddComment,
  onClearFilters,
  onDeleteRecipe,
  onLoadComments,
  onOpenCreate,
  onPageChange,
  onPageSizeChange,
  onRefresh,
  onToggleLike,
  onUpdateRecipe,
  onUpdateFilters,
  onViewProfile,
  page,
  pageSize,
  recipes,
  tags,
  totalRecipes,
}) {
  const [layout, setLayout] = useState('list');
  const totalPages = Math.max(1, Math.ceil(totalRecipes / pageSize));
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  const hasActiveFilters =
    filters.search.trim() || filters.tag.trim() || filters.sort !== 'newest';

  useEffect(() => {
    onPageSizeChange(layout);
  }, [layout]);

  async function changePage(nextPage) {
    await onPageChange(nextPage);
    document.getElementById('feed')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <>
      <section className="feed-toolbar" id="feed">
        <div>
          <span className="eyebrow">Posts</span>
          <h2>Recipe feed</h2>
        </div>
        <div className="toolbar-actions">
          <button
            type="button"
            disabled={!isAuthenticated}
            title={isAuthenticated ? 'Create recipe' : 'Login to create recipes'}
            onClick={onOpenCreate}
          >
            <Icon name="plus" />
            New recipe
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onRefresh(page)}
          >
            <Icon name="refresh" />
            Refresh
          </button>
        </div>
      </section>

      {feedError ? <p className="form-error">{feedError}</p> : null}

      <section className="feed-controls" aria-label="Recipe filters">
        <label className="control-field search-field">
          <span>
            <Icon name="search" />
            Search
          </span>
          <input
            value={filters.search}
            placeholder="Title or description..."
            onChange={(event) =>
              onUpdateFilters({ search: event.target.value })
            }
          />
        </label>

        <label className="control-field">
          <span>
            <Icon name="filter" />
            Tag
          </span>
          <select
            value={filters.tag}
            onChange={(event) => onUpdateFilters({ tag: event.target.value })}
          >
            <option value="">All tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.tag_name}>
                {tag.tag_name}
              </option>
            ))}
          </select>
        </label>

        <label className="control-field">
          <span>Sort</span>
          <select
            value={filters.sort}
            onChange={(event) => onUpdateFilters({ sort: event.target.value })}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="likes">Most liked</option>
            <option value="comments">Most commented</option>
            <option value="title">Title A-Z</option>
          </select>
        </label>

        <div className="layout-toggle" aria-label="Feed layout">
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

        {hasActiveFilters ? (
          <button
            type="button"
            className="secondary-button"
            onClick={onClearFilters}
          >
            Clear
          </button>
        ) : null}
      </section>

      {isLoading ? <LoadingIndicator label="Loading recipes..." /> : null}

      <section className="feed-layout">
        <div className={`post-list post-list-${layout}`}>
          {isLoading && recipes.length === 0
            ? Array.from({ length: pageSize }).map((_, index) => (
                <article className="recipe-card skeleton-card" key={index}>
                  <div className="skeleton-image" />
                  <div className="skeleton-content">
                    <span />
                    <span />
                    <span />
                  </div>
                </article>
              ))
            : null}

          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              comments={commentsByRecipe[recipe.id]}
              currentUserId={currentUserId}
              layout={layout}
              recipe={recipe}
              searchTerm={filters.search}
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

          {!isLoading && recipes.length === 0 ? (
            <p className="empty-feed">
              No recipes yet. Publish the first one from New recipe.
            </p>
          ) : null}

          {totalRecipes > pageSize ? (
            <nav className="pagination-bar" aria-label="Recipe pagination">
              <button
                type="button"
                className="secondary-button pagination-edge pagination-first"
                disabled={!hasPreviousPage || isLoading}
                aria-label="First page"
                title="First page"
                onClick={() => changePage(1)}
              >
                &lt;&lt;
              </button>
              <div className="pagination-center">
                <button
                  type="button"
                  className="secondary-button"
                  disabled={!hasPreviousPage || isLoading}
                  onClick={() => changePage(page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className="secondary-button"
                  disabled={!hasNextPage || isLoading}
                  onClick={() => changePage(page + 1)}
                >
                  Next
                </button>
              </div>
              <button
                type="button"
                className="secondary-button pagination-edge pagination-last"
                disabled={!hasNextPage || isLoading}
                aria-label="Last page"
                title="Last page"
                onClick={() => changePage(totalPages)}
              >
                &gt;&gt;
              </button>
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
