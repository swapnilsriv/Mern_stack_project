const express = require('express');
const router = express.Router();
const Post = require('../models/Post.Js');

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

router.get('/', isLoggedIn, (req, res) => {
    // Fetch blog posts from the database
    Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { posts });
        }
    });
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('new');
});

router.post('/new', isLoggedIn, (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, author: req.user._id });
    newPost.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/blog');
        }
    });
});

module.exports = router;
