const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Bid, Product} = require('../models');


router.get('/', async (req, res) => {
    const userData = await User.findByPk(req.session.userID, {
        attributes: { exclude: ['password']},
        raw: true
    })
    const productData = await Product.findAll({
        where: {
            user_id: req.session.userID
        },
        raw: true
    })
    console.log("REACHED!")
    console.log(userData, productData);
    res.render('profile', {
        userData,
        productData
    })
});

module.exports = router;