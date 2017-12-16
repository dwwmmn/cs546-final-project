const express = require("express");
const router = express.Router();

module.exports = (passport) => {
    router.get("/", (req, res) => {
        let msg = req.flash('message')[0];
        let err = req.flash('error')[0];
        res.render("login/index", {message: msg, error: err});
    });

    router.post("/",
        passport.authenticate('login-strategy', { failureRedirect: '/login', failureFlash: true }),
        (req, res) => {
            res.redirect("/");
        }
    );

    return router;
}
