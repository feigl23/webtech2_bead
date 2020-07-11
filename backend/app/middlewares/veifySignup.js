const db = require("../models");
const User = db.user;

//Ellenőrzi, hogy a felhasnálónév foglalt-e
checkUsernameExist = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) return res.status(500).json({ message: "Internal server error!"});
        if (user) return res.status(400).json({ message: "Failed! Username is already in use!" });
        next();
    });
};
const verifySignUp = {
    checkUsernameExist
};

module.exports = verifySignUp;