const {Category} = require('../models');

const categoryData = [
    
];

const categorySeed = () => Category.bulkCreate(categoryData);
module.exports = categorySeed;