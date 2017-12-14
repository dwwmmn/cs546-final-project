const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const decks = db.decks;
const cards = db.cards;

router.get("/", async(req, res) => {
    try {
        let results = {};
        let deckList = await decks.getDecks();
        results["decks"] = deckList;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }

        res.render("decks/index", results);
    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Something went wrong"});
    }
});

router.get("/:userId", async(req, res) => {
    try {
        let results = {};
        let deckList = await decks.getDecksByOwner(req.params.userId);

        results["decks"] = deckList;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }

        res.render("decks/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

router.post("/", async(req, res) => {
});

module.exports = router;
