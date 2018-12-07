const passport = require('passport');

exports.twitterLogin = passport.authenticate('twitter');

// handle the callback after twitter has authenticated the user
exports.twitterAuthCallback = passport.authenticate('twitter', {
  failureRedirect : '/wishlist',
  successRedirect : '/wishlist'
})

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}