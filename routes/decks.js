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

router.get("/create", async(req, res) => {
    try {
        let results = {};
        let msg = req.flash('error')[0];
        results.message = msg;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;
            res.render("decks/create", results);
        } else {
            res.redirect("/login");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get("/:deckId", async(req, res) => {
    try {
        let results = {};
        let deck = await decks.getDeck(req.params.deckId);
        let msg = req.flash("error")[0];

        results.error = msg;

        results.deck = deck;

        if (req.user) {
            let user = await users.getUser(req.user._id);

            if (user._id == deck.owner) {
                results.canDelete = true;
            }
            results.username = user.username;
        }

        console.log(results);

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
        let pageNum = Math.max(1, Math.min(req.body.pageNumber + 1, Math.ceil(deckList.length/10)));

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
        let pageNum = Math.max(1, Math.min(req.body.pageNumber - 1, Math.ceil(deckList.length/10)));

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
        let pageNum = Math.max(1, Math.min(req.body.pageNumber, Math.ceil(deckList.length/10)));

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

router.post("/create", async(req, res) => {
    try {
        let results = {};

        if (req.user) {
            let user = await users.getUser(req.user._id);

            let newDeck = {
                owner: user._id,
                name: req.body.name,
                description: req.body.description,
                isPublic: true,
                upvotes: [ user._id],
                downvotes: [],
                cards: []
            };

            let createdDeck = await decks.addDeck(newDeck);

            res.redirect("/decks/" + createdDeck._id);

        }
    } catch (err) {
        console.log(err);
        req.flash('error', "Deck name already taken");
        res.redirect("/decks/create");
    }
});

router.post("/:deckId/delete", async(req, res) => {
    try {
        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deck = await decks.getDeck(req.params.deckId);

            if (deck.owner == user._id) {
                deck = await decks.removeCard(deck._id, req.body.deleteCard);

                res.redirect("/decks/ " + deck._id);
            } else {
                req.flash("error", "You are not the deck owner!");
                res.redirect("/decks/ " + deck._id);
            }
        } else {
            req.flash("error", "You must login for that");
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;
