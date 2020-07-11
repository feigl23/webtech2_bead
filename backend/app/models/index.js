const config = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = config.url;

db.user = require("./user");

db.books = require("./books")(mongoose);


module.exports = db;
