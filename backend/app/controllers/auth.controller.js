const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Regisztráció
signup = (req, res) => {

    //Új felhasználó létrehozása hashelt jelszóval
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    //Felhasználó mentése az adatbázisba,
    // majd a művelet sikerességétől függően a megfelelő Http-állapotkód küldése
    user.save()
        .then(() => {
            return res.status(200).send();
        })
        .catch(err => {
            return res.status(500).json({ message: "Internal server error " + err });
        })
}

//Bejelentkezés
signin = (req, res) => {
    //Felhasználónév alapján keres az adatbázisban
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        //Szerver hiba
        if (err) return res.status(500).json({ message: `Internal server error: ${err}` });
        //A felhasználó nem található
        if (!user) return res.status(404).json({ message: "User not found!" });

        //Az adadtbázisban tárolt hashelt , illetve a beérkezett jelzsó összehasonlítása
        var isValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid password", accesToken: null });

        //Ha jó a jelszó => token létrehozása, 24 órás érvényesség
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({
            id: user._id,
            username: user.username,
            accesToken: token
        })
    })
}

const auth = {
    signin,
    signup
}

module.exports = auth;