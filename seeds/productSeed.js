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
        product_name: 'Gibberish',
        price: 323,
        stock: 14,
        size: "One-Size",
        description: "",
        category_id: 1,
        brand_id: 1,
        image: '/images/balenciagashoes.jpg'
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 2332,
        stock: 14,
        size: "M",
        description: "",
        category_id: 3,
        brand_id: 1,
        img: '/images/mastermind.jpeg'
    },
    {
        product_name: 'Superfluous',
        price: 3456,
        stock: 14,
        size: "A",
        description: "",
        category_id: 1,
        brand_id: 1,
        img: ""
    },
    {
        product_name: 'Plain T-Shirt',
        price: 10000,
        stock: 14,
        size: "L",
        description: "",
        category_id: 1,
        brand_id: 1,
        img: ""
    },
    {
        product_name: 'Amongus chicken nugget',
        price: 10000000,
        stock: 1,
        size: "Sus",
        description: "Sus",
        category_id: 1,
        brand_id: 1,
        img: ""
    },
  ];
  

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;