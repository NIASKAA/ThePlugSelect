const {Category} = require('../models');

const categoryData = [
    {
      category_name: 'Shirts',
    },
    {
      category_name: 'Shorts',
    },
    {
      category_name: 'Art',
    },
    {
      category_name: 'Hats',
    },
    {
        category_name: 'Figurines'
    },
    {
        category_name:'Jackets'
    },
    {
      category_name: 'Shoes',
    },
  ];
  
const seedCategories = () => Category.bulkCreate(categoryData);
module.exports = seedCategories;