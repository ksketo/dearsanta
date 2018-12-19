const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get('/', function(req, res, next) {
  res.redirect("/wishlist");
});

router.get('/wishlist', async function(req, res, next) {
  if (!req.user) {
    res.render('index', {
      title: 'Wishlist',
      description: "Your Christmas Whishlist"
    });
  } else {
    const user = await User.findOne({ _id: req.user.id });

    res.render('index', {
      title: 'Wishlist',
      description: "Your Christmas Whishlist",
      wishlist: user.wishlist
    });
  }
});

router.get('/wishlist/:id', async function(req, res, next) {
  const user = await User.findOne({ _id: req.params.id }).select("wishlist");

  res.render('index', {
    title: 'Wishlist',
    description: "Your Christmas Whishlist",
    wishlist: user.wishlist
  });
});

router.get('/gift-guides', function(req, res, next) {
  const guides = require("../public/data/gift-guides.json");

  res.render('gift-guides', {
    title: 'Gift Guides',
    description: "Christmas Gift Guides",
    guides
  });
});

router.post("/api/wishlist/add", async (req, res) => {
  req.sanitizeBody('item');
  req.checkBody('item', 'You must supply an item').notEmpty();
  req.checkBody('item', 'You must supply a string').isString();
  const errors = req.validationErrors();

  if (!errors) {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ["$addToSet"]: { wishlist: req.body.item }},
      {
        new: true,
        runValidators: true,
      }
    ).exec();
  
    res.json(user.wishlist);
  } else {
    res.redirect("/wishlist");
  }
});

router.post("/api/wishlist/remove", async (req, res) => {
  req.sanitizeBody('item');
  req.checkBody('item', 'You must supply an item').notEmpty();
  req.checkBody('item', 'You must supply a string').isString();
  const errors = req.validationErrors();

  if (!errors) {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ["$pull"]: { wishlist: req.body.item }},
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    res.json(user.wishlist);
  } else {
    res.redirect("/wishlist");
  }
})

/**
 * Auth Routes
 */
router.get('/logout', authController.logout);

/**
 * Twitter Auth Routes
 */
router.get('/auth/twitter', authController.twitterLogin);
router.get('/auth/twitter/callback', (req, res, next) => {
  next();
}, authController.twitterAuthCallback, (req, res) => {
  res.redirect('/wishlist');
});

/**
 * Google Auth Routes
 */
router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback',
  authController.googleAuthCallback,
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/wishlist');
});

module.exports = router;
