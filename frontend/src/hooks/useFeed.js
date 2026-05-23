import { useEffect, useState } from 'react';
import { graphqlRequest } from '../api.js';
import {
  ADD_COMMENT_MUTATION,
  COMMENTS_QUERY,
  CREATE_RECIPE_MUTATION,
  CREATE_TAG_MUTATION,
  DELETE_RECIPE_MUTATION,
  FEED_QUERY,
  LIKE_RECIPE_MUTATION,
  TAGS_QUERY,
  UNLIKE_RECIPE_MUTATION,
  UPDATE_RECIPE_MUTATION,
} from '../graphql/documents.js';

function toRecipeId(recipeId) {
  return Number.parseInt(recipeId, 10);
}

const defaultPageSize = 5;
const gridPageSize = 6;
const defaultFilters = {
  search: '',
  tag: '',
  sort: 'newest',
};

export function useFeed(token) {
  const [recipes, setRecipes] = useState([]);
  const [commentsByRecipe, setCommentsByRecipe] = useState({});
  const [feedError, setFeedError] = useState('');
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [tags, setTags] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [filters, setFilters] = useState(defaultFilters);

  async function loadTags() {
    if (!token) return;

    try {
      const data = await graphqlRequest(TAGS_QUERY, {}, token);
      setTags(data.tags || []);
    } catch (error) {
      setFeedError(error.message);
    }
  }

  async function refreshFeed(nextPage = page, nextFilters = filters) {
    if (!token) return;

    setIsFeedLoading(true);
    setFeedError('');

    try {
      const data = await graphqlRequest(
        FEED_QUERY,
        {
          limit: pageSize,
          offset: (nextPage - 1) * pageSize,
          search: nextFilters.search.trim() || null,
          tag: nextFilters.tag.trim() || null,
          sort: nextFilters.sort,
        },
        token
      );
      setRecipes(data.recipes || []);
      setTotalRecipes(data.recipeCount || 0);
      setPage(nextPage);
    } catch (error) {
      setFeedError(error.message);
    } finally {
      setIsFeedLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return undefined;

    setIsFeedLoading(true);
    const refreshTimer = window.setTimeout(() => {
      refreshFeed(1, filters);
    }, 120);

    return () => window.clearTimeout(refreshTimer);
  }, [token, filters, pageSize]);

  useEffect(() => {
    loadTags();
  }, [token]);

  async function goToPage(nextPage) {
    const maxPage = Math.max(1, Math.ceil(totalRecipes / pageSize));
    const normalizedPage = Math.min(Math.max(nextPage, 1), maxPage);
    await refreshFeed(normalizedPage, filters);
  }

  function updateFilters(nextFilters) {
    setPage(1);
    setFilters((current) => ({
      ...current,
      ...nextFilters,
    }));
  }

  function clearFilters() {
    setPage(1);
    setFilters(defaultFilters);
  }

  function updatePageSize(layout) {
    const nextPageSize = layout === 'grid' ? gridPageSize : defaultPageSize;
    setPage(1);
    setPageSize(nextPageSize);
  }

  async function createTag(tagName) {
    await graphqlRequest(
      CREATE_TAG_MUTATION,
      { tag: { tag_name: tagName } },
      token
    );
    await loadTags();
  }

  async function createRecipe(recipe) {
    await graphqlRequest(CREATE_RECIPE_MUTATION, { recipe }, token);
    await refreshFeed(1, filters);
  }

  async function updateRecipe(recipeId, recipe) {
    const data = await graphqlRequest(
      UPDATE_RECIPE_MUTATION,
      { id: String(recipeId), recipe },
      token
    );
    await refreshFeed(page, filters);
    return data.updateRecipe;
  }

  async function deleteRecipe(recipeId) {
    await graphqlRequest(
      DELETE_RECIPE_MUTATION,
      { id: String(recipeId) },
      token
    );
    await refreshFeed(page, filters);
    return true;
  }

  async function toggleLike(recipe) {
    const recipe_id = toRecipeId(recipe.id);

    setRecipes((current) =>
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

    try {
      if (recipe.userLiked) {
        await graphqlRequest(UNLIKE_RECIPE_MUTATION, { recipe_id }, token);
      } else {
        await graphqlRequest(LIKE_RECIPE_MUTATION, { recipe_id }, token);
      }
    } catch (error) {
      setFeedError(error.message);
      await refreshFeed(page, filters);
    }
  }

  async function loadComments(recipeId) {
    const data = await graphqlRequest(
      COMMENTS_QUERY,
      { recipe_id: String(recipeId) },
      token
    );

    setCommentsByRecipe((current) => ({
      ...current,
      [recipeId]: data.getPostComments,
    }));
  }

  async function addComment(recipeId, commentText) {
    await graphqlRequest(
      ADD_COMMENT_MUTATION,
      {
        comment: {
          recipe_id: String(recipeId),
          comment_text: commentText,
        },
      },
      token
    );

    await loadComments(recipeId);
    await refreshFeed(page, filters);
  }

  return {
    addComment,
    commentsByRecipe,
    createRecipe,
    createTag,
    clearFilters,
    deleteRecipe,
    feedError,
    filters,
    goToPage,
    isFeedLoading,
    loadComments,
    page,
    pageSize,
    recipes,
    refreshFeed,
    tags,
    toggleLike,
    totalRecipes,
    updateRecipe,
    updateFilters,
    updatePageSize,
  };
}
