const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const wishlistController = require("../controllers/wishlistController");
const giftGuideController = require("../controllers/giftGuideController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get('/', (req, res, next) => res.redirect("/wishlist"));

/**
 * Wishlist Routes
 */
router.get('/wishlist', catchErrors(wishlistController.myWishlist));
router.get('/wishlist/:id', catchErrors(wishlistController.getWishlistForUser));
router.post("/api/wishlist/add", catchErrors(wishlistController.addItem));
router.post("/api/wishlist/remove", catchErrors(wishlistController.removeItem));

/** 
 * Gift Guides Routes
 */
router.get('/gift-guides', giftGuideController.getGuides);

/**
 * Auth Routes
 */
router.get('/logout', authController.logout);

/**
 * Twitter Auth Routes
 */
router.get('/auth/twitter', authController.twitterLogin);
router.get('/auth/twitter/callback', authController.twitterAuthCallback);

/**
 * Google Auth Routes
 */
router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleAuthCallback);

module.exports = router;
