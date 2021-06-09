//home page//
const router = require('express').Router();
const { Brand, Category, Product, ProductTag, Tag, User } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
        const dbProductData = await Product.findAll({
            attributes: ['product_id', 'product_name', 'price', 'stock', 'size', 'description'],
            include:
            [
                {
                    model: Category,
                    attributes: ['category_name'],
                },
                {
                    model: Brand,
                    attributes: ['brand_name']
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
            ]
        });
        const products = dbProductData.map((product) => product.get({ plain: true }));
        console.log(products);
        res.render('homepage', {
            products,
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.sessionloggedin) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/product/:id', async (req, res) => {
    try {
        const dbProductData = await Product.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'product_name', 'price', 'stock', 'size', 'description'],
            include: [
                {
                    model: Category,
                    attributes: ['category_name'],
                },
                {
                    model: Brand,
                    attributes: ['brand_name']
                },
                {
                    model: ProductTag,
                    attributes: [],
                    include:
                    [
                        {
                            model: Product,
                            attributes: ['id', 'product_name', 'price', 'stock', 'size', 'description'],
                        },
                        {
                            model: Tag,
                            attributes: ['tag_name'],
                        },
                        {
                            model: Brand,
                            attributes: ['brand_name'],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });
       if (!dbProductData[0]) {
           res.status(404).json({ message: 'This product is unavailabe.' });
           return;
       } 
       const product = dbProductData.get({ plain: true });

       res.render('product', {
           product,
           loggedIn: req.session.loggedIn
       });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;