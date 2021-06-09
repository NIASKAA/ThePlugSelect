const {Brand} = require('../models');

const brandData = [
    {
        brand_name: 'Gucci',
    },
    {
        brand_name: 'Prada',
    },
    {
        brand_name: 'Kenzo',
    },
    {
        brand_name: 'Hermes',
    },
  ];
  
const seedBrands = () => Brand.bulkCreate(brandData);
module.exports = seedBrands;