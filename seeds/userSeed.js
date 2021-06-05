const {User} = require('../models');

const userData = [

];

const userSeed = () => User.bulkCreate(userData);
module.exports = userSeed;