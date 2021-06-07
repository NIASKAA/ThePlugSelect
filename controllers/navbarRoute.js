const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('main', {title: 'The Plug Select'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

router.get('/bid', (req, res) => {
    res.render('homepage', {title: 'Bids'});
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }
    res.render('/homepage');
});
