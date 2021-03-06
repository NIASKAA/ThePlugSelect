const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Brand extends Model {}

Brand.init(
  {
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestatms: false,
    freezeTableName: true,
    underscored: true,
    modelName: "brand",
  }
);

module.exports = Brand;
