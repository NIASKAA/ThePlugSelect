const sequelize = require('../config/connection');
const seedCategories = require('./categorySeed')
const seedProducts = require('./productSeed')
const userSeed = require('./userSeed');
const seedProductTags = require('./productTagSeed');
const seedBrands = require('./brandSeeds');
const seedTags = require('./tagSeed');
const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedBrands();
  console.log('\n----- BRANDS SEEDED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  await userSeed();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();