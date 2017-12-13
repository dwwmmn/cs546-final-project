const express = require("express");
const router = express.Router();
const db = require("../db/mongoSetup.js");
const users = db.users;
const cards = db.cards;

// TODO 
router.get("/", async(req, res) => {
    try {
        let results = {};
        let card = await cards.getCards();
        results["cards"] = cards;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }
        res.render("cards/index", results);

    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

router.post("/", async(req, res) => {
});

router.get("/:cardId", async(req, res) => {
    try {
        let results = {};
        let card = await cards.getCard(req.params.cardId);
        results["card"] = card;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }


        res.render("cards/index", results);

    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

module.exports = router;
