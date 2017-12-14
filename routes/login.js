const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    let msg = req.flash('error')[0];
    res.render("login/index", {error: msg});
});

router.post("/", passport.authenticate('mongodb', {failureRedirect: '/login', failureFlash: true}),
    (req, res) => {
    // TODO
    res.redirect("/");
});

module.exports = router;
