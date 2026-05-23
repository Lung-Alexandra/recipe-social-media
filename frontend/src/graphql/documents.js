export const REGISTER_MUTATION = `
  mutation CreateUser($user: UserInputType) {
    createUser(user: $user) {
      user_id
      username
      email
      bio
      profile_picture
      date_joined
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ME_QUERY = `
  query CurrentUser($user_id: ID!) {
    user(user_id: $user_id) {
      user_id
      username
      email
      bio
      profile_picture
      date_joined
    }
  }
`;

export const FEED_QUERY = `
  query Feed($limit: Int, $offset: Int, $search: String, $tag: String, $sort: String) {
    recipeCount(search: $search, tag: $tag)
    recipes(limit: $limit, offset: $offset, search: $search, tag: $tag, sort: $sort) {
      id
      user_id
      title
      description
      ingredients
      instructions
      imageUrl
      dateCreated
      likeCount
      commentCount
      userLiked
      author {
        user_id
        username
        profile_picture
      }
      tags {
        id
        tag_name
      }
    }
  }
`;

export const TAGS_QUERY = `
  query Tags {
    tags {
      id
      tag_name
    }
  }
`;

export const CREATE_TAG_MUTATION = `
  mutation CreateTag($tag: TagInputType) {
    createTag(tag: $tag) {
      id
      tag_name
    }
  }
`;

export const CREATE_RECIPE_MUTATION = `
  mutation CreateRecipe($recipe: RecipeInputType) {
    createRecipe(recipe: $recipe) {
      id
      title
      description
      ingredients
      instructions
      imageUrl
      dateCreated
      likeCount
      commentCount
      userLiked
      author {
        user_id
        username
        profile_picture
      }
      tags {
        id
        tag_name
      }
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = `
  mutation UpdateRecipe($id: ID!, $recipe: RecipeInputType) {
    updateRecipe(id: $id, recipe: $recipe) {
      id
      user_id
      title
      description
      ingredients
      instructions
      imageUrl
      dateCreated
      likeCount
      commentCount
      userLiked
      author {
        user_id
        username
        profile_picture
      }
      tags {
        id
        tag_name
      }
    }
  }
`;

export const DELETE_RECIPE_MUTATION = `
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

export const LIKE_RECIPE_MUTATION = `
  mutation LikeRecipe($recipe_id: Int) {
    likePost(recipe_id: $recipe_id) {
      id
      recipe_id
    }
  }
`;

export const UNLIKE_RECIPE_MUTATION = `
  mutation UnlikeRecipe($recipe_id: Int) {
    unlikePost(recipe_id: $recipe_id)
  }
`;

export const COMMENTS_QUERY = `
  query Comments($recipe_id: ID!) {
    getPostComments(recipe_id: $recipe_id) {
      count
      comments {
        id
        user_id
        recipe_id
        comment_text
        date_commented
        author {
          user_id
          username
          profile_picture
        }
      }
    }
  }
`;

export const ADD_COMMENT_MUTATION = `
  mutation AddComment($comment: CommentInputType) {
    addComment(comment: $comment) {
      id
      user_id
      recipe_id
      comment_text
      date_commented
    }
  }
`;

export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($user: UserUpdateInputType) {
    updateUser(user: $user) {
      user_id
      username
      email
      bio
      profile_picture
      date_joined
    }
  }
`;

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($user_id: ID!) {
    deleteUser(user_id: $user_id)
  }
`;

export const USER_PROFILE_QUERY = `
  query UserProfile($user_id: ID!, $limit: Int, $offset: Int) {
    user(user_id: $user_id) {
      user_id
      username
      email
      bio
      profile_picture
      date_joined
    }
    userRecipeCount(user_id: $user_id)
    userRecipes(user_id: $user_id, limit: $limit, offset: $offset) {
      id
      user_id
      title
      description
      ingredients
      instructions
      imageUrl
      dateCreated
      likeCount
      commentCount
      userLiked
      author {
        user_id
        username
        profile_picture
      }
      tags {
        id
        tag_name
      }
    }
  }
`;
