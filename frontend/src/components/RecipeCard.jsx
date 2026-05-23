import { useEffect, useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';
import { Icon } from './Icon.jsx';

export function RecipeCard({
  comments,
  currentUserId,
  layout = 'list',
  onAddComment,
  onDeleteRecipe,
  onLoadComments,
  onToggleLike,
  onUpdateRecipe,
  onViewProfile,
  recipe,
  searchTerm = '',
  style,
  tags = [],
}) {
  const [commentText, setCommentText] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [editForm, setEditForm] = useState(() => toRecipeForm(recipe));
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const ingredientItems = splitRecipeText(recipe.ingredients);
  const instructionItems = splitRecipeText(recipe.instructions);
  const hasSearch = searchTerm.trim().length > 0;
  const showRecipeImage = recipe.imageUrl && !imageFailed;
  const isAuthor = String(currentUserId || '') === String(recipe.user_id || '');

  useEffect(() => {
    setImageFailed(false);
  }, [recipe.imageUrl]);

  useEffect(() => {
    setEditForm(toRecipeForm(recipe));
  }, [recipe]);

  async function toggleComments() {
    const nextOpen = !commentsOpen;
    setCommentsOpen(nextOpen);

    if (nextOpen && !comments) {
      await onLoadComments(recipe.id);
    }
  }

  async function submitComment(event) {
    event.preventDefault();
    const text = commentText.trim();
    if (!text) return;

    await onAddComment(recipe.id, text);
    setCommentText('');
    setCommentsOpen(true);
  }

  async function submitEdit(event) {
    event.preventDefault();

    await onUpdateRecipe(recipe.id, {
      ...editForm,
      tags: editForm.tags,
    });
    setIsEditing(false);
  }

  async function deleteRecipe() {
    await onDeleteRecipe(recipe.id);
    setIsDeleteDialogOpen(false);
  }

  return (
    <article className={`recipe-card recipe-card-${layout}`} style={style}>
      <ConfirmDialog
        confirmLabel="Delete recipe"
        isOpen={isDeleteDialogOpen}
        message="This will remove the recipe, its likes, comments, and tag links."
        title="Delete this recipe?"
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={deleteRecipe}
      />

      {showRecipeImage ? (
        <img
          className="recipe-image"
          src={recipe.imageUrl}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="recipe-image recipe-image-placeholder">
          <span>{recipe.title?.slice(0, 1).toUpperCase() || 'R'}</span>
        </div>
      )}

      <div className="recipe-content">
        {isAuthor ? (
          <div className="owner-actions">
            <button
              type="button"
              className="owner-action edit-action"
              onClick={() => setIsEditing((current) => !current)}
            >
              {isEditing ? 'Cancel edit' : 'Edit'}
            </button>
            <button
              type="button"
              className="owner-action delete-action"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </button>
          </div>
        ) : null}

        {isEditing ? (
          <form className="recipe-edit-form" onSubmit={submitEdit}>
            <EditField
              label="Title"
              value={editForm.title}
              onChange={(value) =>
                setEditForm((current) => ({ ...current, title: value }))
              }
              required
            />
            <EditField
              label="Image URL"
              value={editForm.imageUrl}
              onChange={(value) =>
                setEditForm((current) => ({ ...current, imageUrl: value }))
              }
              required
            />
            <EditField
              label="Description"
              value={editForm.description}
              onChange={(value) =>
                setEditForm((current) => ({ ...current, description: value }))
              }
              textarea
              required
            />
            <EditField
              label="Ingredients"
              value={editForm.ingredients}
              onChange={(value) =>
                setEditForm((current) => ({ ...current, ingredients: value }))
              }
              textarea
              required
            />
            <EditField
              label="Instructions"
              value={editForm.instructions}
              onChange={(value) =>
                setEditForm((current) => ({ ...current, instructions: value }))
              }
              textarea
              required
            />
            <fieldset className="tag-picker compact">
              <legend>Tags</legend>
              <div>
                {tags.map((tag) => {
                  const selected = editForm.tags.includes(tag.tag_name);

                  return (
                    <button
                      key={tag.id}
                      type="button"
                      className={selected ? 'tag-chip selected' : 'tag-chip'}
                      onClick={() =>
                        setEditForm((current) => ({
                          ...current,
                          tags: selected
                            ? current.tags.filter(
                                (entry) => entry !== tag.tag_name
                              )
                            : [...current.tags, tag.tag_name],
                        }))
                      }
                    >
                      {tag.tag_name}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <button type="submit">Save recipe</button>
          </form>
        ) : null}

        <header className="recipe-header">
          <div>
            <h3>{highlightSearch(recipe.title, searchTerm)}</h3>
            <p>
              by{' '}
              <button
                type="button"
                className="inline-link"
                onClick={() =>
                  onViewProfile(recipe.author?.user_id || recipe.user_id)
                }
              >
                {recipe.author?.username || 'Unknown user'}
              </button>
            </p>
          </div>
          <span className="recipe-date">{formatDate(recipe.dateCreated)}</span>
        </header>

        <p className={hasSearch ? 'recipe-description searched-field' : 'recipe-description'}>
          {highlightSearch(recipe.description, searchTerm)}
        </p>

        <div className="tag-list">
          {(recipe.tags || []).map((tag) => (
            <span key={tag.id}>{tag.tag_name}</span>
          ))}
        </div>

        <details className="recipe-details">
          <summary>Ingredients</summary>
          <ul className="recipe-list">
            {ingredientItems.map((item) => (
              <li key={item}>{highlightSearch(item, searchTerm)}</li>
            ))}
          </ul>
        </details>
        <details className="recipe-details">
          <summary>Instructions</summary>
          <ol className="recipe-list">
            {instructionItems.map((item) => (
              <li key={item}>{highlightSearch(item, searchTerm)}</li>
            ))}
          </ol>
        </details>

        <footer className="recipe-actions">
          <button
            type="button"
            className={recipe.userLiked ? 'like-button active' : 'like-button'}
            onClick={() => onToggleLike(recipe)}
          >
            <Icon name="heart" />
            {recipe.userLiked ? 'Liked' : 'Like'} - {recipe.likeCount || 0}
          </button>
          <button type="button" className="text-button" onClick={toggleComments}>
            <Icon name="comment" />
            Comments - {recipe.commentCount || comments?.count || 0}
          </button>
        </footer>

        {commentsOpen ? (
          <section className="comments-block">
            <form className="comment-form" onSubmit={submitComment}>
              <input
                value={commentText}
                placeholder="Write a comment"
                onChange={(event) => setCommentText(event.target.value)}
              />
              <button type="submit">
                <Icon name="send" />
                Send
              </button>
            </form>
            <div className="comment-list">
              {(comments?.comments || []).map((comment) => (
                <article className="comment-item" key={comment.id}>
                  <Avatar
                    className="comment-avatar"
                    imageUrl={comment.author?.profile_picture}
                    label={comment.author?.username || 'User'}
                  />
                  <div className="comment-body">
                    <button
                      type="button"
                      className="comment-author"
                      onClick={() =>
                        onViewProfile(comment.author?.user_id || comment.user_id)
                      }
                    >
                      {comment.author?.username || 'Unknown user'}
                    </button>
                    <p>{comment.comment_text}</p>
                  </div>
                </article>
              ))}
              {comments && comments.comments.length === 0 ? (
                <p className="empty-state">No comments yet.</p>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function toRecipeForm(recipe) {
  return {
    title: recipe.title || '',
    description: recipe.description || '',
    ingredients: recipe.ingredients || '',
    instructions: recipe.instructions || '',
    imageUrl: recipe.imageUrl || '',
    tags: (recipe.tags || []).map((tag) => tag.tag_name),
  };
}

function EditField({
  label,
  value,
  onChange,
  required = false,
  textarea = false,
  placeholder,
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
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function highlightSearch(value, searchTerm) {
  const text = String(value || '');
  const term = searchTerm.trim();

  if (!term) return text;

  const normalizedText = text.toLowerCase();
  const normalizedTerm = term.toLowerCase();
  const pieces = [];
  let cursor = 0;
  let matchIndex = normalizedText.indexOf(normalizedTerm);

  if (matchIndex === -1) {
    return text;
  }

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      pieces.push(text.slice(cursor, matchIndex));
    }

    const end = matchIndex + term.length;
    pieces.push(
      <mark className="search-highlight" key={`${matchIndex}-${end}`}>
        {text.slice(matchIndex, end)}
      </mark>
    );

    cursor = end;
    matchIndex = normalizedText.indexOf(normalizedTerm, cursor);
  }

  if (cursor < text.length) {
    pieces.push(text.slice(cursor));
  }

  return pieces;
}

function splitRecipeText(value) {
  if (!value) return [];

  const normalized = value
    .replace(/\r/g, '')
    .split(/\n|\. |;|,/)
    .map((item) => item.replace(/^\d+[.)]\s*/, '').replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [value];
}

function formatDate(value) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}
