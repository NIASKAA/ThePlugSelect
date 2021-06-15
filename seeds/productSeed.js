const {Product} = require('../models');

const productData = [
    {
        product_name: 'Phenex Unicorn',
        price: 2000,
        stock: 2,
        size: "1/60",
        description: "PG Unicorn Phenex NIB",
        category_id: 5,
        brand_id: 11,
        image: '/images/phenex.jpeg'
    },
    {
        product_name: 'Off-White Jackets',
        price: 500,
        stock: 14,
        size: "L",
        description: "Art work inspired",
        category_id: 6,
        brand_id: 6,
        image: '/images/offwhiteJacket.JPG'
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 300,
        stock: 14,
        size: "M",
        description: "Luggage Tag Style",
        category_id: 1,
        brand_id: 6,
        image: '/images/offwhiteT2.JPG'
    },
    {
        product_name: 'Balenciaga Shoes',
        price: 800,
        stock: 1,
        size: "10",
        description: "Black balenciaga shoes",
        category_id: 7,
        brand_id: 9,
        image: "/images/balenciagashoes.jpg"
    },
    {
        product_name: 'Northface Jacket',
        price: 100,
        stock: 1,
        size: "L",
        description: "Tan northface jacket",
        category_id: 6,
        brand_id: 7,
        image: "/images/DSC_0113.JPG"
    },
    {
        product_name: 'Jordans',
        price: 100,
        stock: 1,
        size: "10",
        description: "Black Jordans",
        category_id: 7,
        brand_id: 10,
        image: "/images/jordans.jpg"
    },
  ];
  

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;