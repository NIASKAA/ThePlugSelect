const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'tag_id'
      }
    },
    // brand_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'brand',
    //     key: 'brand_id'
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'productTag',
  }
);

module.exports = ProductTag;
