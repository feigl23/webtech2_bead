const { crud, filter } = require("../controllers");
const auth = require("../middlewares/authJwt");

var router = require("express").Router();

module.exports = app => {
    //GET
    router.get("/", [auth.verifyToken], filter.filterBy);

    //POST
    router.post("/", [auth.verifyToken], crud.create);

    //PUT
    router.put("/:id", [auth.verifyToken], crud.update);

    //DELETE
    router.delete("/:id", [auth.verifyToken], crud.deleteById);

    router.delete("/", [auth.verifyToken], crud.deleteAll);


    app.use('/api/books', router);
}