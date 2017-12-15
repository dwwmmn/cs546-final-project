
const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const decks = db.decks;

router.get("/", async(req, res) => {
    try { 
        if (req.user) {
            let results = {};
            let user = await users.getUser(req.user._id);

            results.username = user.username;
            results.user = user;

            res.render("account/index", results);

        } else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Something went wrong"});
    }
});

router.get("/decks", async(req, res) => {
    try {
        let results = {};


        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deckList = await decks.getDecksByOwner(req.user._id);

            results.username = user.username;
            results.decks = deckList;
            res.render("my_decks/index", results);
        } else {
            res.redirect("/login");
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({message: err});
    }
});

module.exports = router;
