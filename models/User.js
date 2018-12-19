const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    twitter: {
        id: String,
        displayName: String,
        username: String,
        photos: [{ value: String }]
    },
    google: {
        id: String,
        displayName: String,
        photos: [{ value: String }]
    },
    wishlist: [{ type: String }]
});

userSchema.virtual('avatar').get(function() {
    let photo;

    try {
        if (this.twitter && this.twitter.photos[0]) {
            photo = this.twitter.photos[0].value.replace("normal", "bigger");
        } else if (this.google && this.google.photos[0]) {
            photo = this.google.photos[0].value;
        } else {
            photo = "/images/santa-claus.png";
        }
    } catch (err) {
        console.error(err);
        photo = "/images/santa-claus.png";
    }

    return photo;
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
