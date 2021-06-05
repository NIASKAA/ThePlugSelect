const {Tag} = require('../models');

const tagData = [
    {
        tag_name: 'Shoes'
    },
    {
        tag_name: 'Clothes'
    }

];

const tagSeed = () => Tag.bulkCreate(tagData);
module.exports = tagSeed;