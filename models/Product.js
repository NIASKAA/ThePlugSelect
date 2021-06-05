const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Product extends Model {}

Product.init(
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;
