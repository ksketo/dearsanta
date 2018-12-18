const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

require('dotenv').config({ path: 'variables.env' });

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CB_URL
}, async (token, tokenSecret, profile, done) => {
    twitterProfile = {
        twitter: {
            id: profile.id,
            token: token,
            username: profile.username,
            displayName: profile.displayName,
            photos: profile.photos
        }
    };

    try {
        const user = await User.findOneAndUpdate({ "twitter.id": profile.id }, twitterProfile, {
            new: true,
            upsert: true,
            runValidators: true
        });
        done(null, user);
    } catch (e) {
        done(error);
    }
}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});