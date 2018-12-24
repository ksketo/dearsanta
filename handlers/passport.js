const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

require("dotenv").config({ path: "variables.env" });

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CB_URL
    },
    async (token, tokenSecret, profile, done) => {
      const twitterProfile = {
        twitter: {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          photos: profile.photos
        }
      };

      try {
        const user = await User.findOneAndUpdate(
          { "twitter.id": profile.id },
          twitterProfile,
          {
            new: true,
            upsert: true,
            runValidators: true
          }
        );
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB_URL
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const googleProfile = {
          google: {
            id: profile.id,
            displayName: profile.displayName,
            photos: profile.photos
          }
        };
        const user = await User.findOneAndUpdate(
          { "google.id": profile.id },
          googleProfile,
          {
            new: true,
            upsert: true,
            runValidators: true
          }
        );

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
