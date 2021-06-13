const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Bid} = require('../models');
const cloudinary = require('../config/cloudinary');
const Formidable = require('formidable');
const util = require('util');


router.get('/profile', withAuth, async (req, res) => {
    const userData = User.findByPk(req.session.userID, {
        attributes: { exclude: ['password']},
        include: [{model:Bid}],
        raw: true
    })
    console.log(userData);
    res.render('profile', {
        userData
    })
});

module.exports = router;