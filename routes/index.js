var express = require('express');
var router = express.Router();

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


module.exports = router;
