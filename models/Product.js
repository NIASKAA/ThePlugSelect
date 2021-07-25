const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Product extends Model {}

Product.init(
   {
      product_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      product_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      price: {
         type: DataTypes.DECIMAL,
         allowNull: false,
      },
      stock: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      size: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      category_id: {
         type: DataTypes.INTEGER,
         references: {
            model: "category",
            key: "category_id",
            unique: false,
         },
      },
      brand_id: {
         type: DataTypes.INTEGER,
         references: {
            model: "brand",
            key: "brand_id",
            unique: false,
         },
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: "user",
            key: "id",
            unique: false,
            allowNull: true,
         },
      },
      date_added: {
         type: DataTypes.DATE,
         defaultValue: new Date(),
      },

      bid_start: {
         type: DataTypes.DATE,
         defaultValue: new Date(),
      },
      bid_end: {
         type: DataTypes.DATE,
         defaultValue: new Date(new Date().setDate(new Date().getDate() + 14)),
      },
      winner_id: {
         type: DataTypes.INTEGER,
         references: {
            model:"user",
            key:"id",
            unique: false,
            allowNull:true,
         }
      }
   },
   {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "product",
   }
);

module.exports = Product;
