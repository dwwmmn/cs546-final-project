const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const decks = db.decks;
const cards = db.cards;

router.get("/", async(req, res) => {
    try {
        let results = {};
        let deckList = await decks.getDecks(true);
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
        let errorMsg = req.flash("error")[0];
        let msg = req.flash("message")[0];

        results.message = msg;

        results.error = errorMsg;
        results.deck = deck;


        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;

            if (deck.upvotes.includes(user._id)) {
                results.unUpvotes = true;
            }

            if (deck.downvotes.includes(user._id)) {
                results.unDownvotes = true;
            }

            if (user._id == deck.owner) {
                results.canDelete = true;
                results.public = deck.isPublic;
            }

            if (user._id != deck.owner && !deck.isPublic) {
                results.deck = null;
                results.public = null;
            }

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

        let deckList = await decks.getDecksByName(req.body.name, true);

        results.searchName = req.body.name;
        results.pageNumber = 1;

        results.decks = deckList.slice(0, 10);

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results.username = user.username;
        }

        res.render("decks/index", results);

    } catch (err) {
        res.status(500).json({ message: "Something went wrong :("});
    }
});

router.post("/next", async(req, res) => {
    try {
        let results = {};
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks(true));
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
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks(true));
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
        let deckList = await (req.body.search? decks.getDecksByName(req.body.search): decks.getDecks(true));
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
        req.flash('error', "Deck name already taken");
        res.redirect("/decks/create");
    }
});

router.post("/:deckId/delete/:cardId", async(req, res) => {
    try {
        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deck = await decks.getDeck(req.params.deckId);

            if (deck.owner == user._id) {
                deck = await decks.removeCard(deck._id, req.params.cardId);

                res.redirect("/decks/" + deck._id);
            } else {
                req.flash("error", "You are not the deck owner!");
                res.redirect("/decks/" + deck._id);
            }
        } else {
            req.flash("error", "You must login for that");
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }

});

router.post("/:deckId/upvote", async(req, res) => {
    try {
        let deckId = req.params.deckId;
        let deck = await decks.getDeck(req.params.deckId);
        if (req.user && deck.isPublic) {
            let user = await users.getUser(req.user._id);
            await decks.upvote(deckId, user._id);

            res.redirect("/decks/" + deckId);
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/downvote", async(req, res) => {
    try {
        let deckId = req.params.deckId;
        let deck = await decks.getDeck(req.params.deckId);

        if (req.user && deck.isPublic) {
            let user = await users.getUser(req.user._id);
            await decks.downvote(deckId, user._id);

            res.redirect("/decks/" + deckId);
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/removeUpvote", async(req, res) => {
    try {
        let deckId = req.params.deckId;
        let deck = await decks.getDeck(req.params.deckId);

        if (req.user && deck.isPublic) {
            let user = await users.getUser(req.user._id);
            await decks.removeUpvote(deckId, user._id);

            res.redirect("/decks/" + deckId);
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/removeDownvote", async(req, res) => {
    try {
        let deckId = req.params.deckId;
        let deck = await decks.getDeck(req.params.deckId);

        if (req.user && deck.isPublic) {
            let user = await users.getUser(req.user._id);
            await decks.removeDownvote(deckId, user._id);

            res.redirect("/decks/" + deckId);
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/delete", async(req, res) => {
    try {
        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deck = await decks.getDeck(req.params.deckId);

            if (user._id == deck.owner) {
                await decks.deleteDeck(deck._id);

                req.flash('message', deck.name + " deleted");
                res.redirect("/account/decks");

            } else {
                req.flash("error", "You can't do that!");
                res.redirect("/decks/" + deck._id);
            }

        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/publish", async(req, res) => {
    try {

        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deck = await decks.getDeck(req.params.deckId);

            if (user._id == deck.owner) {
                await decks.publish(deck._id);
                req.flash('message', deck.name + " published");
                res.redirect("/decks/" + deck._id);
            } else {
                req.flash("error", "You can't do that!");
                res.redirect("/decks/" + deck._id);
            }
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.post("/:deckId/unPublish", async(req, res) => {
    try {
        
        if (req.user) {
            let user = await users.getUser(req.user._id);
            let deck = await decks.getDeck(req.params.deckId);

            if (user._id == deck.owner) {
                await decks.unPublish(deck._id);
                req.flash('message', deck.name + " unpublished");
                res.redirect("/decks/" + deck._id);
            } else {

                req.flash("error", "You can't do that!");
                res.redirect("/decks/" + deck._id);
            }
        } else {
            req.flash("error", "You must log in to do that");
            res.redirect("/decks/" + deckId);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});
module.exports = router;
