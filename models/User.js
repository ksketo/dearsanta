const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    wishlist: [{ type: String }]
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
