const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/");
const users = db.users;

router.get("/", (req, res) => {
    res.render("signup/index");
});

router.post("/", (req, res) => {
    let user = {};

    if (req.body) {
        user["username"] = req.body.username;
        user["fullname"] = req.body.fullname;
        user["about"] = req.body.about;
        user["email"] = req.body.email;
        user["password"] = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        res = await db.addUser(user);

        res.status(500).json({message: "Something went wrong"});
    } else {
        res.status(500).json({message: "Something went wrong"});
    }

});

module.exports = router;
