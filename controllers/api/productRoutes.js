const router = require('express').Router();
const {Product, ProductTag, Tag, Category} = require('../../models');

// get all products
router.get('/', async (req,res) => {
    try {

        const productData = await Product.findAll({
            include:[{model: Category}, {model:Tag}]
        });

        res.status(200).json(productData);
    }

    catch(err) {
        res.status(500).json(err);
    }
})

// get a single product by id
router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        include: [{model: Category}, {model: Tag}]
      });
      if (!productData) {
        res.status(404).json({message:"Product with this id not found"});
      }
    res.status(200).json(productData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });


router.post('/', (req, res) => {
/* req.body should look like this...
    {
    product_name: "Basketball",
    price: 200.00,
    img: http://drive.google.com/sfpow44123?423.jpg
    stock: 3,
    tagIds: [1, 2, 3, 4]
    }
*/
Product.create(req.body)
    .then((product) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
            product_id: product.product_id,
            tag_id,
        };
        });
        return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
    console.log(err);
    res.status(400).json(err);
    });
  });


module.exports = router;

