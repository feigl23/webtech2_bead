const db = require("../models");
const Book = db.books;
var mongoose = require('mongoose');


//Megadott paraméter alapján keres
filterBy = (req, res) => {

    let condition = {};
    let error;
    let byId = false;

    for (let param in req.query) {
        if (param.includes("id")) {
            byId = true;
            condition = req.query[param];
        } else {
            condition = { [param]: { $regex: new RegExp(req.query[param]), $options: "i" } };
        }
        error = [param];

    }

    if (byId) {
        findByIds(condition, res);
    } else {
        findByParam(condition, res, error);
    }

}


//Könyv keresése id alapján
findByIds = (id, res) => {
    Book.findById(id)
        .then(data => {
            if (!data) return res.status(404).json({ message: `Not found book with id: ${id} ` });
            res.status(200).send(data);
        })
        .catch(() => {
            res.status(500).json({ message: `Error retrieving book with id: ${id}` });
        })
};
////Könyv keresése egyéb paraméterek alapján alapján
findByParam = (param, res, error) => {
    Book.find(param)
        .then(data => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).json({
                message: `Some error occurred while find  book by ${error}. Error: ${err}`
            });
        });
}


const filter = {
    filterBy
}
module.exports = filter;