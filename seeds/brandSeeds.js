const {Brand} = require('../models');

const brandData = [
    {   
        brand_id: 1,
        brand_name: 'Gucci',
    },
    {
        brand_id: 2,
        brand_name: 'Yeezy',
    },
    {   
        brand_id: 3,
        brand_name: 'Champion',
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
        brand_name: "Huff"
    },
    {
        brand_id: 8,
        brand_name: "Y-3"
    },
    {
        brand_id: 9,
        brand_name: "Nike"
    },
    {
        brand_id: 10,
        brand_name: "Jordans"
    }

  ];
  
const seedBrands = () => Brand.bulkCreate(brandData);
module.exports = seedBrands;