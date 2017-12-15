const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const cards = db.cards;
const decks = db.decks;

router.get("/", async(req, res) => {
    try {
        let results = {};
        let cardList = await cards.getCards();
        let pageNum = 1;

        let msg = req.flash('message')[0]

        results.message = msg;

        results.cards = cardList.slice((pageNum - 1)*10 , (pageNum)*10);
        results.pageNumber = pageNum;

        if (req.body.searchName) {
            results.searchName = req.body.searchName;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }

        res.render("cards/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

router.get("/:cardId", async(req, res) => {
    try {
        let results = {};
        let card = await cards.getCard(req.params.cardId);
        results["card"] = card;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }


        res.render("cards/instance", results);

    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Something went wrong"});
    }
});

router.post("/search", async(req, res) => {
    try {
        let results = {};

        let cardList = await cards.getCardsByName(req.body.name);

        results.searchName = req.body.name;
        results.pageNumber = 1;

        results.cards = cardList.slice(0, 10);

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }

        res.render("cards/index", results);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong :("});
    }
});

router.post("/next", async(req, res) => {
    try {
        let results = {};
        let cardList = await (req.body.search? cards.getCardsByName(req.body.search): cards.getCards());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber + 1, Math.ceil(cardList.length/10)));

        results["cards"] = cardList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }

        res.render("cards/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});
router.post("/prev", async(req, res) => {
    try {
        let results = {};
        let cardList = await (req.body.search? cards.getCardsByName(req.body.search): cards.getCards());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber - 1, Math.ceil(cardList.length/10)));

        results["cards"] = cardList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }

        res.render("cards/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});

router.post("/goto", async(req, res) => {
    try {
        let results = {};
        let cardList = await (req.body.search? cards.getCardsByName(req.body.search): cards.getCards());
        let pageNum = Math.max(1, Math.min(req.body.pageNumber, Math.ceil(cardList.length/10)));

        results["cards"] = cardList.slice((pageNum - 1)*10 , (pageNum)*10);
        results["pageNumber"] = pageNum;

        if (req.body.search) {
            results.searchName = req.body.search;
        }

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let myDecks = await decks.getDecksByOwner(user._id);
            results.username = user.username;
            results.myDecks = myDecks;
        }

        res.render("cards/index", results);
    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }

});

router.post("/add/:cardId", async(req, res) => {
    try {
        let results = {};

        if (req.user) {
            let cardId = req.params.cardId;
            await decks.insertCard(req.body.deckToAdd, cardId);

            let card = await cards.getCard(cardId);
            let deck = await decks.getDeck(req.body.deckToAdd);

            req.flash('message', card.name + ' added to ' + deck.name);
            res.redirect("/cards");
        } else {
            res.redirect("/login");
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Something went wrong"});
    }
});
module.exports = router;
