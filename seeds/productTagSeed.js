const {ProductTag} = require('../models');

const productTagData = [

];

const productTagSeed = () => ProductTag.bulkCreate(productTagData);
module.exports = productTagSeed;