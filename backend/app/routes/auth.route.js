const { auth } = require("../controllers");
const { verifySignUp } = require("../middlewares");


module.exports = app => {
    app.use((res, req, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/auth/signin", auth.signin);
    app.post("/api/auth/signup", [verifySignUp.checkUsernameExist], auth.signup);
}