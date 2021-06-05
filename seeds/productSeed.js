const {Product} = require('../models');

const productData = [

];

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;