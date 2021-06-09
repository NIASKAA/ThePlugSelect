const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Bid extends Model {}

Bid.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        highest_bid: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        
        item_id: {
            type: DataTypes.INT,
            allowNull: false,
            references: {
                model:"Product",
                key:'id'
            }
        }
    },
    {
        sequelize,
        timestatms: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'bid',
    }
);

module.exports = Brand;