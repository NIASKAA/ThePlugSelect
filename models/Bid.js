const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Bid extends Model {}

Bid.init(
  {
    bid_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    bid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    user_id: {
        type:DataTypes.INTEGER,
        reference: {
            model: "user",
            key: "user_id"
        }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product",
        key: "product_id",
      },
    },
  },
  {
    sequelize,
    timestatms: false,
    freezeTableName: true,
    underscored: true,
    modelName: "bid",
  }
);

module.exports = Bid;
