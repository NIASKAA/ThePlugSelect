const {Product} = require('../models');

const productData = [
    {
        product_name: 'Phenex Unicorn',
        price: 2000,
        stock: 2,
        size: "1/60",
        description: "PG Unicorn Phenex NIB",
        category_id: 5,
        brand_id: 5,
        image: '/images/phenex.jpeg'
    },
    {
        product_name: 'Off-White Jackets',
        price: 500,
        stock: 14,
        size: "L",
        description: "Galaxy paint inspired",
        category_id: 1,
        brand_id: 1,
        image: '/images/balenciagashoes.jpg'
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 300,
        stock: 14,
        size: "M",
        description: "Luggage Tag Style",
        category_id: 3,
        brand_id: 1,
        image: '/images/mastermind.jpeg'
    },
    {
        product_name: 'Off-White Shoes',
        price: 800,
        stock: 14,
        size: "43",
        description: "Moto-Wrap",
        category_id: 1,
        brand_id: 1,
        image: "/images/bape.png"
    },
    {
        product_name: 'Plain T-Shirt',
        price: 10000,
        stock: 14,
        size: "L",
        description: "",
        category_id: 1,
        brand_id: 1,
        image: "/images/kaws.jpeg"
    },
    {
        product_name: 'Amongus chicken nugget',
        price: 10000000,
        stock: 1,
        size: "Sus",
        description: "Sus",
        category_id: 1,
        brand_id: 1,
        image: ""
    },
  ];
  

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;