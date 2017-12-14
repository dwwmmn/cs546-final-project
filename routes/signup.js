const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/");
const users = db.users;

router.get("/", (req, res) => {
    let msg = req.flash('error')[0];
    res.render("signup/index", {message: msg});
});

router.post("/", async(req, res) => {
    let user = {};

    if (req.body) {
        user["username"] = req.body.username;
        user["fullname"] = req.body.fullname;
        user["about"] = req.body.about;
        user["email"] = req.body.email;
        user["password"] = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        let result = await users.addUser(user);

        if (result) {
            res.redirect("/login");
        } else {
            req.flash('error', 'Error signing up');
            res.redirect("/");
        }
    } else {
        req.flash('error', 'Error signing up');
        res.redirect("/");
    }

});

module.exports = router;
