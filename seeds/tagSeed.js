const {Tag} = require('../models');

const tagData = [

];

const tagSeed = () => Tag.bulkCreate(tagData);
module.exports = tagSeed;