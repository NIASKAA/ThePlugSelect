const {Product} = require('../models');

const productData = [
    {
        product_name: 'Phenex MasterMind Collab',
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
        image: 'public/images/offwhiteT2.JPG'

    },
    {
        product_name: 'Balenciaga Shoes',
        price: 800,
        stock: 1,
        size: "10",
        description: "Black balenciaga shoes",
        category_id: 7,
        brand_id: 9,
        image: "public/images/balenciagashoes.jpg"
    },
    {
        product_name: 'Northface Jacket',
        price: 100,
        stock: 1,
        size: "L",
        description: "Tan northface jacket",
        category_id: 6,
        brand_id: 7,
        image: "public/images/DSC_0113.JPG"
    },
    {
        product_name: 'Off-White T Shirt',
        price: 300,
        stock: 14,
        size: "S",
        description: "Do Not Cross Style",
        category_id: 1,
        brand_id: 6,
        image: "/images/donotcross.jpg"
    },
    {
        product_name: 'Jordans',
        price: 100,
        stock: 1,
        size: "10",
        description: "Black Jordans",
        category_id: 7,
        brand_id: 10,
        image: "public/images/jordans.jpg"

    },
    {
        product_name: 'Balenciaga Shoes',
        price: 1000,
        stock: 14,
        size: "10",
        description: "Socks Bro",
        category_id: 1,
        brand_id: 12,
        image: "/images/balenciagashoes.jpg"
    },
    {
        product_name: 'Off-White Sweater',
        price: 10000,
        stock: 14,
        size: "L",
        description: "Outline Style",
        category_id: 1,
        brand_id: 6,
        image: "/images/offwhitesweater.jpg"
    },
    {
        product_name: 'Moncler X Off-White',
        price: 1000,
        stock: 14,
        size: "L",
        description: "Reflective Jacket",
        category_id: 1,
        brand_id: 13,
        image: "/images/offwhitemonclear.jpg"
    },
    {
        product_name: 'Off-White Shoes',
        price: 800,
        stock: 14,
        size: "10",
        description: "Jordan Style Inspired",
        category_id: 1,
        brand_id: 6,
        image: "/images/offwhiteshoes2.jpg"
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 300,
        stock: 14,
        size: "XL",
        description: "Alien Style Inspired",
        category_id: 1,
        brand_id: 6,
        image: "/images/offwhiteT.jpg"
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 500,
        stock: 14,
        size: "L",
        description: " Incomplete Art ",
        category_id: 1,
        brand_id: 6,
        image: "/images/offwhiteJacket.jpg"
    },
  ];
  

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;