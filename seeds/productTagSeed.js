const {ProductTag} = require('../models');

const productTagData = [

{
    product_id: 1,
    tag_id: 1
},
{
    product_id: 2,
    tag_id:2
},


];

const productTagSeed = () => ProductTag.bulkCreate(productTagData);
module.exports = productTagSeed;