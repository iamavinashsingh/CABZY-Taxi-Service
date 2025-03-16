
const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
// This model will be used to store the blacklisted tokens.
// This model will be used in the auth.middleware.js file to check if the token is blacklisted or not.
// If the token is blacklisted, then the user will not be authenticated.