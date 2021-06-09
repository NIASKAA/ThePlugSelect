const {Product} = require('../models');

const productData = [
    {
      product_name: 'Gundam Unicorn Figure',
      price: 2000,
      stock: 2,
      size: "2x2",
      description: "Gundam fig perfect condition",
      category_id: 5,
      brand_id: 1,
      img: ""
    },
    {
        product_name: 'Gibberish',
        price: 323,
        stock: 14,
        size: "",
        description: "",
        category_id: 1,
        brand_id: 1,
        img: ""
    },
    {
        product_name: 'Lore ipsum',
        price: 2332,
        stock: 14,
        size: "",
        description: "",
        category_id: 3,
        brand_id: 1,
        img: ""
    },
    {
        product_name: 'Superfluous',
        price: 3456,
        stock: 14,
        size: "",
        description: "",
        category_id: 1,
        brand_id: 1,
        img: ""
    },
    {
        product_name: 'Plain T-Shirt',
        price: 10000,
        stock: 14,
        size: "",
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