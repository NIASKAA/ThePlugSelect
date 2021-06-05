const {Category} = require('../models');

const categoryData = [
    {
        category_name: 'Shop',
    },
    {
        category_name: 'Brands',
    },
    {
        category_name: 'Collectibles',
    },

];

const categorySeed = () => Category.bulkCreate(categoryData);
module.exports = categorySeed;