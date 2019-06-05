const User = require("../models/User");

module.exports = function(req, res, next) {
    User.findById(req.user.id, (err, user) => {
        if (user.isAdmin) {
            next();
        } else {
            return res.status(401).json({ msg: "User is not admin." });
        }
    })
};
