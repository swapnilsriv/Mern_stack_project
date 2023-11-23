const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.Js');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/blog',
    failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.redirect('/auth/register');
        } else {
            res.redirect('/auth/login');
        }
    });
});

module.exports = router;
