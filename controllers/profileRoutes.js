const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Bid, Product} = require('../models');


router.get('/profile', async (req, res) => {
    const userData = await User.findByPk(req.session.userID, {
        attributes: { exclude: ['password']},
        include: [{model: Product}],
        raw: true
    })
    console.log(userData);
    res.render('profile', {
        userData
    })
});

module.exports = router;