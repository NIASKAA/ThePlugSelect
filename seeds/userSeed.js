const {User} = require('../models');

const userData = [
    {
      "username": "Santos",
      "email": "Santos@hotmail.com",
      "password": "password12345"
    },
    {
      "username": "Lecubiscito",
      "email": "leucobiscito@gmail.com",
      "password": "password12345"
    },
    {
      "username": "PragueDemon",
      "email": "praguedemon@aol.com",
      "password": "password12345"
    },
    {
      "username": "Peter",
      "email": "jordanson@msn.com",
      "password": "password12345"
    },
    {
      "username": "Blaize",
      "email": "basrelief@yahoo.com",
      "password": "password12345"
    }
];

const userSeed = () => User.bulkCreate(userData);
module.exports = userSeed;