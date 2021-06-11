const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User} = require('../models');
router.get('/', (req, res) => {
    res.render('main', {title: 'The Plug Select'});
});

router.get('/bid', (req, res) => {
    res.render('homepage', {title: 'Bids'});
});



router.get('/profile', withAuth, async (req, res) => {
    const userData = User.findByPk(req.session.userID, {
        attributes: { exclude: ['password']},
        raw: true
    })
    console.log(userData)
    res.render('profile', {
        userData
    })
})
module.exports = router;