//home page//
const router = require("express").Router();
const {
  Brand,
  Category,
  Product,
  ProductTag,
  Tag,
  User,
  Bid,
} = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
      attributes: [
        "product_id",
        "product_name",
        "price",
        "stock",
        "size",
        "description",
        "image",
      ],
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Brand,
          attributes: ["brand_id", "brand_name"],
        },
        // {
        //     model: ProductTag,
        //     attributes: [],
        //     include:
        //     [
        //         {
        //             model: Product,
        //             attributes: ['id', 'product_name', 'price', 'stock', 'size', 'description'],
        //         },
        //         {
        //             model: Tag,
        //             attributes: ['tag_name'],
        //         },
        //         {
        //             model: Brand,
        //             attributes: ['brand_name'],
        //         },
        //     ],
        // },
        // {
        //     model: User,
        //     attributes: ['username'],
        // }
      ],
    });
    const products = dbProductData.map((product) =>
      product.get({ plain: true })
    );
    console.log(products);
    res.render("homepage", {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/profile", withAuth, (req, res) => {
  /*if(req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }*/
  res.render("profile");
});

router.get("/about", (req, res) => {
  res.render("about", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/postItem", (req, res) => {
  res.render("postItem");
});

router.get("/bid", (req, res) => {
  res.render("chatRoom");
});

router.get("/product/:id", async (req, res) => {
  try {
    const dbProductData = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "product_name",
        "price",
        "stock",
        "size",
        "description",
      ],
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Brand,
          attributes: ["brand_name"],
        },
        {
          model: ProductTag,
          attributes: [],
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "product_name",
                "price",
                "stock",
                "size",
                "description",
              ],
            },
            {
              model: Tag,
              attributes: ["tag_name"],
            },
            {
              model: Brand,
              attributes: ["brand_name"],
            },
          ],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!dbProductData[0]) {
      res.status(404).json({ message: "This product is unavailable." });
      return;
    }
    const product = dbProductData.get({ plain: true });

    res.render("product", {
      product,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bid/:id", async (req, res) => {
  const productData = await Product.findByPk(req.params.id, {
    raw: true,
    include: [
      {
        model: Category,
      },
      {
        model: Brand,
      },
      {
        model: Bid,
      },
    ],
  });

  const userData = await User.findByPk(req.session.userID, {
    raw: true,
    attributes: { exclude: ["password"] },
  });
  console.log(userData);
  res.render("chatRoom", {
    productData,
    userData,
    loggedIn: req.session.loggedIn,
  });
});
module.exports = router;
