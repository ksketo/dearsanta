const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', function(req, res, next) {
  res.redirect("/wishlist");
});

router.get('/wishlist', function(req, res, next) {
  res.render('index', {
    title: 'Wishlist',
    description: "Your Christmas Whishlist"
  });
});

router.get('/shopping-list', function(req, res, next) {
  res.render('index', {
    title: 'Shopping List',
    description: "Your Christmas Shopping List"
  });
});

router.get('/gift-guides', function(req, res, next) {
  res.render('index', {
    title: 'Gift Guides',
    description: "Christmas Gift Guides"
  });
});

/**
 * Auth Routes
 */
router.get('/logout', authController.logout);

/**
 * Twitter Auth Routes
 */
router.get('/auth/twitter', authController.twitterLogin);
router.get('/auth/twitter/callback', (req, res, next) => {
  console.log("here - 1")
  next();
}, authController.twitterAuthCallback, (req, res) => {
  console.log("here - 2")
  res.redirect("/wishlist");
});

module.exports = router;
