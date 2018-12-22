const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.myWishlist = async function(req, res, next) {
  if (!req.user) {
    res.render('index', {
      title: 'Wishlist',
      description: "Your Christmas Whishlist",
      wishlist: []
    });
  } else {
    const user = await User.findOne({ _id: req.user.id });

    res.render('index', {
      title: 'Wishlist',
      description: "Your Christmas Whishlist",
      wishlist: user.wishlist
    });
  }
};

exports.getWishlistForUser = async function(req, res, next) {
  const user = await User.findOne({ _id: req.params.id }).select("wishlist");

  if (user) {
    res.render('index', {
      title: 'Wishlist',
      description: "Your Christmas Whishlist",
      wishlist: user.wishlist
    });
  } else {
    res.redirect('/wishlist');
  }
};

exports.addItem = async function(req, res) {
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
};

exports.removeItem = async function(req, res) {
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
}