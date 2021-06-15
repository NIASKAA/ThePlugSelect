const router = require("express").Router();
const {
  Product,
  ProductTag,
  Tag,
  Category,
  Brand,
  Bid,
} = require("../../models");

const moment = require("moment"); 

// get all products
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }, { model: Brand }],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single product by id
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: "Product with this id not found" });
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  /* req.body should look like this...
    {
    product_name: "Basketball",
    price: 200.00,
    img: http://drive.google.com/sfpow44123?423.jpg
    stock: 3,
    tagIds: [1, 2, 3, 4]
    }
*/
  Product.create({
    product_name: req.body.product_name,
    description : req.body.description,
    price : req.body.price,
    size: req.body.size,
    stock : req.body.stock,
    image: req.body.image,
    user_id: req.session.userID
})
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//
// 3 different queries
// 1st query check if there is a bid period.. 
// 2nd check if bid is available based on the current time and end date. 
// 3rd place bid for that user. (meaning multiple users can have a bid)
// 4th query create or update that bid for that user... 
router.post("/:id/bid", async (req, res) => {
  try {
    // create a new bid
    const bid = await Bid.create({
      user_id: req.session.userID,
      bid: req.body.price,
      item_id: req.params.id,
    });
    // fetch the product by id
    const product = await Product.findByPk(req.params.id);
    // update the product price if the req.body.price > its current price
    if (req.body.price > product.price) {
      product.update({
        price: req.body.price,
      });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
