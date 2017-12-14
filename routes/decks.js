const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const decks = db.decks;
const cards = db.cards;

    //let start = Math.max(0, Math.min((num - 1) * 10, (decks.length/10) * 10));
router.get("/", async(req, res) => {
    try {
        let results = {};
        let deckList = await decks.getDecks();
        let pageNum = 1;

        results.decks = deckList.slice((pageNum - 1)*10 , (pageNum)*10);
        results.pageNumber = pageNum;

        if (req.body.searchName) {
            results.searchName = req.body.searchName;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;
        }

        res.render("decks/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});


router.get("/:deckId", async(req, res) => {
    try {
        let results = {};
        let deck = await decks.getDeck(req.params.deckId);

        results.deck = deck;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;
        }


        res.render("decks/instance", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

router.post("/search", async(req, res) => {
    try {
        let results = {};

        let deckList = await decks.getDecksByName(req.body.name);

        results.searchName = req.body.name;
        results.pageNumber = 1;

        results.decks = deckList.slice(0, 10);

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;
        }

        res.render("decks/index", results);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong :("});
    }
});

router.post("/next", async(req, res) => {
    try {
        let results = {};
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber + 1, deckList.length/10));

        results["decks"] = deckList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["username"] = user.username;
        }

        res.render("decks/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});

router.post("/prev", async(req, res) => {
    try {
        let results = {};
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber - 1, deckList.length/10));

        results["decks"] = deckList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["username"] = user.username;
        }

        res.render("decks/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});

router.post("/goto", async(req, res) => {
    try {
        let results = {};
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber, deckList.length/10));

        results["decks"] = deckList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["username"] = user.username;
        }

        res.render("decks/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});

module.exports = router;
