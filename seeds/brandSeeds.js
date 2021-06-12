const {Brand} = require('../models');

const brandData = [
    {   
        brand_id: 1,
        brand_name: 'Gucci',
    },
    {
        brand_id: 2,
        brand_name: 'Prada',
    },
    {   
        brand_id: 3,
        brand_name: 'Kenzo',
    },
    {
        brand_id: 4,
        brand_name: 'Hermes',
    },
    {   
        brand_id: 5,
        brand_name: 'Mastermind'
    },
    {
        brand_id: 6,
        brand_name: 'Off-White'
    },
    {
        brand_id: 7,
        brand_name: "Huff   "
    }
  ];
  
const seedBrands = () => Brand.bulkCreate(brandData);
module.exports = seedBrands;