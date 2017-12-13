const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const decks = db.decks;

router.get("/", async(req, res) => {
    // TODO check if logged in, return username
    // res.render("home/index", { username: ""});

    try {
        let results = {};
        let deckList =  await decks.getTopDecks();
        results["decks"] = deckList;

        if (req.user) {
            let id = req.user._id;
            let user = await users.getUser(id);
            results["userName"] = user.userName;

        }

        res.render("home/index", results);
    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Something went wrong"});
    }
});

module.exports = router;
