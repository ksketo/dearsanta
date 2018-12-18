const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        photos: [{ value: String }]
    },
    wishlist: [{ type: String }]
});

userSchema.virtual('avatar').get(function() {
    let photo;

    try {
        if (this.twitter) {
            photo = this.twitter.photos[0].value.replace("normal", "bigger");
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
