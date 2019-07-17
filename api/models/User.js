const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }


});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = User = mongoose.model("user", UserSchema);