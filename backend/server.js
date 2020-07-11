const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

//Cross-origin kérés
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// application/json
app.use(bodyParser.json());

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Cstalakozás az adatbázishoz
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log(`Cannot connect to the database! Error: ${err}`);
        process.exit();
    });




require('./app/routes/auth.route')(app);
require("./app/routes/book.route")(app);

// Port beállítása és figyelése
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});