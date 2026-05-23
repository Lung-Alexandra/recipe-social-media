import { useState } from 'react';

const emptyRecipe = {
  title: '',
  description: '',
  ingredients: '',
  instructions: '',
  imageUrl: '',
  tags: [],
};

export function RecipeComposer({ onCreateRecipe, onCreateTag, onCreated, tags }) {
  const [recipe, setRecipe] = useState(emptyRecipe);
  const [tagName, setTagName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitTag(event) {
    event.preventDefault();
    setMessage('');
    const normalizedTag = tagName.trim();

    if (!normalizedTag) return;

    try {
      await onCreateTag(normalizedTag);
      setMessage(`Tag created: ${normalizedTag}`);
      setTagName('');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitRecipe(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await onCreateRecipe({
        ...recipe,
        tags: recipe.tags,
      });
      setRecipe(emptyRecipe);
      setMessage('Recipe published.');
      onCreated?.();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="composer-section" id="composer">
      <header className="section-header">
        <div>
          <span className="eyebrow">Create</span>
          <h2>New recipe</h2>
        </div>
      </header>

      {message ? <p className="inline-status">{message}</p> : null}

      <form className="tag-row" onSubmit={submitTag}>
        <label className="field">
          <span>
            Create new tag
            <em aria-hidden="true">*</em>
          </span>
          <input
            value={tagName}
            placeholder="ex: brunch"
            required
            onChange={(event) => setTagName(event.target.value)}
          />
        </label>
        <button type="submit">Add tag</button>
      </form>

      <form className="recipe-form" onSubmit={submitRecipe}>
        <Field
          label="Title"
          value={recipe.title}
          onChange={(value) =>
            setRecipe((current) => ({ ...current, title: value }))
          }
          required
        />
        <Field
          label="Image URL"
          value={recipe.imageUrl}
          onChange={(value) =>
            setRecipe((current) => ({ ...current, imageUrl: value }))
          }
          required
        />
        <Field
          label="Description"
          value={recipe.description}
          onChange={(value) =>
            setRecipe((current) => ({ ...current, description: value }))
          }
          textarea
          required
        />
        <Field
          label="Ingredients"
          value={recipe.ingredients}
          onChange={(value) =>
            setRecipe((current) => ({ ...current, ingredients: value }))
          }
          textarea
          required
        />
        <Field
          label="Instructions"
          value={recipe.instructions}
          onChange={(value) =>
            setRecipe((current) => ({ ...current, instructions: value }))
          }
          textarea
          required
        />
        <fieldset className="tag-picker">
          <legend>Tags</legend>
          <div>
            {tags.map((tag) => {
              const selected = recipe.tags.includes(tag.tag_name);

              return (
                <button
                  key={tag.id}
                  type="button"
                  className={selected ? 'tag-chip selected' : 'tag-chip'}
                  onClick={() =>
                    setRecipe((current) => ({
                      ...current,
                      tags: selected
                        ? current.tags.filter((entry) => entry !== tag.tag_name)
                        : [...current.tags, tag.tag_name],
                    }))
                  }
                >
                  {tag.tag_name}
                </button>
              );
            })}
          </div>
          {tags.length === 0 ? (
            <p>Create a tag first, then select it here.</p>
          ) : null}
        </fieldset>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </section>
  );
}

function Field({
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
