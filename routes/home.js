const express = require("express");
const router = express.Router();
const db = require("../db/mongoSetup.js");
const users = db.users;

router.get("/", (req, resp) => {
    // TODO check if logged in, return username
    // res.render("home/index", { username: ""});
    if (req.user) {
        let id = req.user._id;
        let user = user.getUser(id);
        res.render("home/index", {username: user.userName});
    } else {
        res.render("home/index");
    }
});

module.exports = router;
