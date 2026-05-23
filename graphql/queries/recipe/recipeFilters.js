const { Op, Sequelize } = require('sequelize');
const db = require('../../../models');

const fuzzySearchThreshold = 0.45;
const searchableRecipeText = `lower(concat_ws(' ',
    COALESCE("Recipe"."title", ''),
    COALESCE("Recipe"."description", '')
))`;

function escapeSearch(search) {
    return db.sequelize.escape(search.toLowerCase());
}

function buildSearchSimilarity(search) {
    return `word_similarity(${escapeSearch(search)}, ${searchableRecipeText})`;
}

function buildRecipeWhere(args = {}) {
    const search = args.search?.trim();

    if (!search) return {};

    return {
        [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
            Sequelize.literal(`${buildSearchSimilarity(search)} > ${fuzzySearchThreshold}`),
        ],
    };
}

function buildTagInclude(args = {}) {
    const tag = args.tag?.trim();

    if (!tag) return [];

    return [
        {
            model: db.Tag,
            through: { attributes: [] },
            where: {
                tag_name: { [Op.iLike]: tag },
            },
            required: true,
        },
    ];
}

function buildRecipeOrder(sort, search) {
    const likeCount = Sequelize.literal(
        '(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."recipe_id" = "Recipe"."id")'
    );
    const commentCount = Sequelize.literal(
        '(SELECT COUNT(*) FROM "Comments" WHERE "Comments"."recipe_id" = "Recipe"."id")'
    );

    if (sort === 'oldest') {
        return [
            ['dateCreated', 'ASC'],
            ['id', 'ASC'],
        ];
    }

    if (sort === 'likes') {
        return [[likeCount, 'DESC'], ['dateCreated', 'DESC'], ['id', 'DESC']];
    }

    if (sort === 'comments') {
        return [[commentCount, 'DESC'], ['dateCreated', 'DESC'], ['id', 'DESC']];
    }

    if (sort === 'title') {
        return [
            ['title', 'ASC'],
            ['dateCreated', 'DESC'],
        ];
    }

    if (search?.trim()) {
        return [
            [Sequelize.literal(buildSearchSimilarity(search.trim())), 'DESC'],
            ['dateCreated', 'DESC'],
            ['id', 'DESC'],
        ];
    }

    return [
        ['dateCreated', 'DESC'],
        ['id', 'DESC'],
    ];
}

module.exports = {
    buildRecipeOrder,
    buildRecipeWhere,
    buildTagInclude,
};
