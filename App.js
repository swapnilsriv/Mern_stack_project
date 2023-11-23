const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set up sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
// Updated usage (without callback)
mongoose.connect('mongodb://localhost:27017/your-blog-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Import routes
const authRoutes = require('./routes/authRoutes.Js');
const blogRoutes = require('./routes/blogRoutes.Js');

// Use routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User.Js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add this middleware after setting up passport
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});