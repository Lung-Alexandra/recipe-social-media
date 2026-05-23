'use strict';

require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('../models');

db.sequelize.options.logging = false;

const password = 'Demo123456!';

const users = [
  {
    username: 'ana.popescu',
    email: 'ana.demo@example.com',
    profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    bio: 'Home cook, soup enthusiast, and weekend baker.',
  },
  {
    username: 'mihai.ionescu',
    email: 'mihai.demo@example.com',
    profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Collects fast weekday recipes and spicy sauces.',
  },
  {
    username: 'irina.kitchen',
    email: 'irina.demo@example.com',
    profile_picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    bio: 'Desserts, farmers market finds, and seasonal plates.',
  },
];

const tags = [
  'comfort',
  'easy',
  'vegetarian',
  'dessert',
  'quick',
  'fresh',
  'brunch',
  'spicy',
];

const recipes = [
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Creamy tomato basil pasta',
    description: 'A simple weeknight pasta with a silky tomato sauce, basil, and parmesan.',
    ingredients: 'Pasta, canned tomatoes, garlic, basil, cream, parmesan, olive oil, salt, pepper.',
    instructions: 'Cook pasta. Saute garlic in olive oil. Add tomatoes and simmer. Stir in cream, basil, and parmesan. Toss with pasta.',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    tags: ['comfort', 'easy', 'quick'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Spicy chicken rice bowl',
    description: 'A colorful bowl with marinated chicken, rice, crunchy vegetables, and a chili yogurt sauce.',
    ingredients: 'Chicken breast, rice, cucumber, carrot, yogurt, chili flakes, lemon, paprika, salt.',
    instructions: 'Marinate chicken with paprika and lemon. Grill until done. Serve over rice with vegetables and chili yogurt.',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    tags: ['spicy', 'quick', 'fresh'],
  },
  {
    authorEmail: 'irina.demo@example.com',
    title: 'Lemon ricotta pancakes',
    description: 'Soft brunch pancakes with lemon zest, ricotta, and a spoon of berry jam.',
    ingredients: 'Flour, eggs, ricotta, milk, lemon zest, sugar, baking powder, butter, berry jam.',
    instructions: 'Mix dry and wet ingredients separately. Combine gently. Cook pancakes in butter and serve warm with jam.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80',
    tags: ['brunch', 'dessert', 'fresh'],
  },
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Roasted vegetable couscous',
    description: 'A light vegetarian plate with roasted vegetables, herbs, lemon, and fluffy couscous.',
    ingredients: 'Couscous, zucchini, bell pepper, red onion, chickpeas, parsley, lemon, olive oil.',
    instructions: 'Roast vegetables and chickpeas. Prepare couscous. Mix everything with parsley, lemon juice, and olive oil.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    tags: ['vegetarian', 'fresh', 'easy'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Garlic butter mushroom toast',
    description: 'Crisp toast topped with buttery mushrooms, herbs, and a squeeze of lemon.',
    ingredients: 'Sourdough, mushrooms, garlic, butter, parsley, lemon, salt, pepper.',
    instructions: 'Toast bread. Cook mushrooms with butter and garlic. Finish with parsley and lemon, then pile onto toast.',
    imageUrl: 'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=1200&q=80',
    tags: ['brunch', 'quick', 'vegetarian'],
  },
  {
    authorEmail: 'irina.demo@example.com',
    title: 'Berry yogurt breakfast jars',
    description: 'Layered jars with Greek yogurt, berries, oats, and honey for a fast breakfast.',
    ingredients: 'Greek yogurt, oats, mixed berries, honey, chia seeds, mint.',
    instructions: 'Layer yogurt, oats, berries, and honey in jars. Chill for 20 minutes or overnight.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    tags: ['fresh', 'brunch', 'easy'],
  },
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Herby potato salad',
    description: 'A bright potato salad with mustard dressing, dill, parsley, and crunchy onions.',
    ingredients: 'Potatoes, mustard, olive oil, vinegar, dill, parsley, red onion, salt.',
    instructions: 'Boil potatoes until tender. Whisk dressing. Toss warm potatoes with herbs and onion.',
    imageUrl: 'https://images.unsplash.com/photo-1625944228741-cf30983d1892?auto=format&fit=crop&w=1200&q=80',
    tags: ['vegetarian', 'fresh', 'comfort'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Chili lime shrimp tacos',
    description: 'Fast tacos with seared shrimp, cabbage, lime, and a smoky chili crema.',
    ingredients: 'Shrimp, tortillas, cabbage, lime, sour cream, chili powder, garlic, cilantro.',
    instructions: 'Season and sear shrimp. Mix crema. Fill tortillas with cabbage, shrimp, crema, and cilantro.',
    imageUrl: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80',
    tags: ['spicy', 'quick', 'fresh'],
  },
  {
    authorEmail: 'irina.demo@example.com',
    title: 'Dark chocolate banana bread',
    description: 'Moist banana bread with dark chocolate chunks and toasted walnuts.',
    ingredients: 'Bananas, flour, eggs, brown sugar, butter, dark chocolate, walnuts, baking soda.',
    instructions: 'Mash bananas. Mix batter with chocolate and walnuts. Bake until a tester comes out clean.',
    imageUrl: 'https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['dessert', 'comfort'],
  },
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Green lentil soup',
    description: 'A cozy lentil soup with carrots, celery, tomato, and bay leaf.',
    ingredients: 'Green lentils, carrots, celery, onion, tomato paste, stock, bay leaf, thyme.',
    instructions: 'Saute vegetables. Add lentils, stock, and herbs. Simmer until lentils are tender.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    tags: ['comfort', 'vegetarian'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Peanut noodle salad',
    description: 'Cold noodles tossed with peanut dressing, cucumbers, carrots, and herbs.',
    ingredients: 'Noodles, peanut butter, soy sauce, lime, cucumber, carrot, cilantro, sesame oil.',
    instructions: 'Cook noodles and rinse cold. Whisk dressing. Toss noodles with vegetables and herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
    tags: ['quick', 'fresh', 'vegetarian'],
  },
  {
    authorEmail: 'irina.demo@example.com',
    title: 'Apple cinnamon crumble',
    description: 'Warm baked apples under a crisp cinnamon oat topping.',
    ingredients: 'Apples, oats, flour, butter, cinnamon, brown sugar, lemon.',
    instructions: 'Slice apples and toss with lemon. Add crumble topping. Bake until golden and bubbling.',
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a9?auto=format&fit=crop&w=1200&q=80',
    tags: ['dessert', 'comfort'],
  },
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Caprese grain bowl',
    description: 'A fresh bowl with grains, tomatoes, mozzarella, basil, and balsamic dressing.',
    ingredients: 'Cooked grains, tomatoes, mozzarella, basil, balsamic vinegar, olive oil.',
    instructions: 'Layer grains with tomatoes and mozzarella. Drizzle with balsamic and olive oil. Add basil.',
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    tags: ['fresh', 'vegetarian', 'easy'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Smoky bean chili',
    description: 'A rich bean chili with smoked paprika, tomatoes, and a little heat.',
    ingredients: 'Beans, tomatoes, onion, garlic, smoked paprika, cumin, chili flakes, stock.',
    instructions: 'Saute onion and garlic. Add spices, beans, tomatoes, and stock. Simmer until thick.',
    imageUrl: 'https://images.unsplash.com/photo-1633436375153-d7045cb93e38?auto=format&fit=crop&w=1200&q=80',
    tags: ['spicy', 'comfort', 'vegetarian'],
  },
  {
    authorEmail: 'irina.demo@example.com',
    title: 'Vanilla peach parfait',
    description: 'Creamy vanilla yogurt layered with peaches, granola, and honey.',
    ingredients: 'Vanilla yogurt, peaches, granola, honey, lemon zest.',
    instructions: 'Slice peaches. Layer yogurt, fruit, and granola in glasses. Finish with honey.',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
    tags: ['dessert', 'fresh', 'easy'],
  },
  {
    authorEmail: 'ana.demo@example.com',
    title: 'Spinach feta omelette',
    description: 'A fluffy omelette with spinach, feta, scallions, and black pepper.',
    ingredients: 'Eggs, spinach, feta, scallions, butter, black pepper.',
    instructions: 'Cook spinach briefly. Add beaten eggs. Fold with feta and scallions.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    tags: ['brunch', 'quick', 'vegetarian'],
  },
  {
    authorEmail: 'mihai.demo@example.com',
    title: 'Sesame cucumber noodles',
    description: 'A quick chilled noodle dish with sesame sauce and crisp cucumber.',
    ingredients: 'Noodles, cucumber, sesame paste, soy sauce, rice vinegar, garlic, sesame seeds.',
    instructions: 'Cook noodles and chill. Toss with sesame sauce and cucumber. Sprinkle sesame seeds.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    tags: ['quick', 'fresh'],
  },
];

const comments = [
  'Looks perfect for tonight.',
  'I tried this and added extra herbs. Great result.',
  'Saving this for the weekend.',
  'The sauce idea is excellent.',
  'Simple and really useful.',
];

async function findOrCreateUser(user) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [record] = await db.User.findOrCreate({
    where: { email: user.email },
    defaults: {
      ...user,
      password: hashedPassword,
      date_joined: new Date(),
    },
  });

  return record;
}

async function findOrCreateTag(tag_name) {
  const [record] = await db.Tag.findOrCreate({
    where: { tag_name },
    defaults: { tag_name },
  });

  return record;
}

async function findOrCreateRecipe(recipe, userByEmail, tagByName) {
  const author = userByEmail.get(recipe.authorEmail);
  const existing = await db.Recipe.findOne({
    where: {
      title: recipe.title,
      user_id: author.user_id,
    },
  });

  const record = existing || await db.Recipe.create({
    user_id: author.user_id,
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    imageUrl: recipe.imageUrl,
    dateCreated: new Date(),
  });

  for (const tagName of recipe.tags) {
    const tag = tagByName.get(tagName);
    await db.RecipeTag.findOrCreate({
      where: {
        recipe_id: record.id,
        tag_id: tag.id,
      },
      defaults: {
        recipe_id: record.id,
        tag_id: tag.id,
      },
    });
  }

  return record;
}

async function createEngagement(recipeRecords, userRecords) {
  for (const recipe of recipeRecords) {
    const otherUsers = userRecords.filter((user) => user.user_id !== recipe.user_id);

    for (const user of otherUsers.slice(0, 2)) {
      await db.Like.findOrCreate({
        where: {
          user_id: user.user_id,
          recipe_id: recipe.id,
        },
        defaults: {
          user_id: user.user_id,
          recipe_id: recipe.id,
          date_liked: new Date(),
        },
      });
    }

    for (const [index, user] of otherUsers.entries()) {
      const comment_text = comments[(recipe.id + index) % comments.length];

      await db.Comment.findOrCreate({
        where: {
          user_id: user.user_id,
          recipe_id: recipe.id,
          comment_text,
        },
        defaults: {
          user_id: user.user_id,
          recipe_id: recipe.id,
          comment_text,
          date_commented: new Date(),
        },
      });
    }
  }
}

async function main() {
  const userRecords = [];
  const tagRecords = [];
  const recipeRecords = [];

  for (const user of users) {
    userRecords.push(await findOrCreateUser(user));
  }

  for (const tag of tags) {
    tagRecords.push(await findOrCreateTag(tag));
  }

  const userByEmail = new Map(userRecords.map((user) => [user.email, user]));
  const tagByName = new Map(tagRecords.map((tag) => [tag.tag_name, tag]));

  for (const recipe of recipes) {
    recipeRecords.push(await findOrCreateRecipe(recipe, userByEmail, tagByName));
  }

  await createEngagement(recipeRecords, userRecords);

  console.log(`Demo data ready: ${userRecords.length} users, ${tagRecords.length} tags, ${recipeRecords.length} recipes.`);
  console.log(`Demo password for all demo users: ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.sequelize.close();
  });
