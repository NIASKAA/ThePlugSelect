const {Product} = require('../models');

const productData = [
    {
        product_name: 'Phenex MasterMind Collab',
        price: 2000,
        stock: 2,
        size: "1/60",
        description: "PG Unicorn Phenex NIB",
        category_id: 5,
        brand_id: 5,
        image: 'https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718857/phenex_scb1um.jpg'
    },
    {
        product_name: 'Off-White Jackets',
        price: 500,
        stock: 14,
        size: "L",
        description: "Galaxy paint inspired",
        category_id: 1,
        brand_id: 6,
        image: 'https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718857/offwhitegalaxy_wii4hp.jpg'
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 300,
        stock: 14,
        size: "M",
        description: "Luggage Tag Style",
        category_id: 3,
        brand_id: 6,
        image: 'https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718856/offwhiteair_xzr2qi.jpg'
    },
    {
        product_name: 'Off-White Shoes',
        price: 800,
        stock: 14,
        size: "43",
        description: "Moto-Wrap",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718839/offwhiteshoes_cmxsyk.jpg"
    },
    {
        product_name: 'Off-White T Shirt',
        price: 300,
        stock: 14,
        size: "S",
        description: "Do Not Cross Style",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718854/donotcross_fpxcua.jpg"
    },
    {
        product_name: 'Amongus chicken nugget',
        price: 10000000,
        stock: 1,
        size: "Sus",
        description: "Sus",
        category_id: 1,
        brand_id: 11,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718837/yikes_eh7ujm.jpg"
    },
    {
        product_name: 'Balenciaga Shoes',
        price: 1000,
        stock: 14,
        size: "10",
        description: "Socks Bro",
        category_id: 1,
        brand_id: 12,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718839/balenciagashoes_w1oqji.jpg"
    },
    {
        product_name: 'Off-White Sweater',
        price: 10000,
        stock: 14,
        size: "L",
        description: "Outline Style",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718862/offwhitesweater_rpfjtq.jpg"
    },
    {
        product_name: 'Moncler X Off-White',
        price: 1000,
        stock: 14,
        size: "L",
        description: "Reflective Jacket",
        category_id: 1,
        brand_id: 13,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718858/offwhitemonclear_ebb4ey.jpg"
    },
    {
        product_name: 'Off-White Shoes',
        price: 800,
        stock: 14,
        size: "10",
        description: "Jordan Style Inspired",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718855/offwhiteshoes2_a7anr9.jpg"
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 300,
        stock: 14,
        size: "XL",
        description: "Alien Style Inspired",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718856/offwhitealien_regjfq.jpg"
    },
    {
        product_name: 'Off-White T-Shirt',
        price: 500,
        stock: 14,
        size: "L",
        description: " Incomplete Art ",
        category_id: 1,
        brand_id: 6,
        image: "https://res.cloudinary.com/ddtqwizaf/image/upload/v1623718856/offwhiteart_ddbnxd.jpg"
    },
  ];
  

const productSeed = () => Product.bulkCreate(productData);
module.exports = productSeed;