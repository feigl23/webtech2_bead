const db = require("../models");
const Book = db.books;

//Új könyv létrhozása
create = (req, res) => {
    //Új könyv
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        published: req.body.published
    });
    //Új könyv mentése
    book.save(book)
        .then((resp) => { res.status(200).send(resp) })
        .catch((err) => {
            res.status(500).json({ message: `Some error occurred while creating the book. Error: ${err} ` });
        });
}

//Könyv módosítása
update = (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Data to update can not be empty!" });

    const id = req.params.id;
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) return res.status(404).json({ message: `Cannot update book with id:${id}. Maybe book was not found!` });
            return res.status(200).send();
        })
        .catch((err) => {
            res.status(500).json({ message: `Error updating book with id: ${id}. Error: ${err}` });
        });
};

//Könyv törlése id alapján
deleteById = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) return res.status(404).json({ message: `Cannot delete Book with id=${id}. Maybe book was not found!` });
            res.status(200).json();
        })
        .catch(() => {
            res.status(500).json({
                message: `Could not delete book with id: ${id}`
            });
        });
};
//Az összes könyv törlése
deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.status(200).json({
                message: `${data.deletedCount} books were deleted successfully!`
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Some error occurred while removing all books."
            });
        });
};

const crud = {
    create,
    update,
    deleteById,
    deleteAll
}
module.exports = crud;