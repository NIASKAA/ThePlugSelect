const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');
const Brand = require('./Brand')
const Bid = require('./Bid');

Product.hasMany(Bid, {
  foreignKey: "product_id"
})
Bid.belongsTo(Product, {
  foreignKey: "product_id"
})
Bid.belongsTo(User, {
  foreignKey: "user_id"
})

Product.belongsTo(Category, {
  foreignKey: "category_id"
})

Category.hasMany(Product, {
  foreignKey: "category_id",
})

Product.belongsTo(Brand, {
    foreignKey: 'brand_id'
})

User.hasMany(Product, {
  foreignKey: "id"
})

Product.belongsTo(User, {
  foreignKey: "id"
})


Brand.hasMany(Product, {
    foreignKey: "brand_id"
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id"
})

Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: "tag_id",
})

module.exports = {User, Category, Product, ProductTag, Tag, Brand, Bid};