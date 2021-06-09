const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');
const Brand = require('./Brand')

Product.belongsTo(Category, {
  foreignKey: "category_id"
})

Category.hasMany(Product, {
  foreignKey: "category_id",
})

Product.belongsTo(Brand, {
    foreignKey: 'brand_id'
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

module.exports = {User, Category, Product, ProductTag, Tag, Brand};