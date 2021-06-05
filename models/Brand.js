const { Model, DataTypes } = requier('sequelize');

const sequelize = require('../config/connection');

class Brand extends model {}

Brand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestatms: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'brand',
    }
);

module.exports = Brand;