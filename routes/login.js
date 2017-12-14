const express = require("express");
const router = express.Router();

module.exports = (passport) => {
    router.get("/", (req, res) => {
        let msg = req.flash('error')[0];
        res.render("login/index", {message: msg});
    });
    
    router.post("/", passport.authenticate('mongodb', {failureRedirect: '/login', failureFlash: true}),
        (req, res) => {
        // TODO
        res.redirect("/");
    });

    return router;
}