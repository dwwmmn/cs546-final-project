const express = require("express");
const router = express.Router();
const db = require("../db/mongoSetup.js");
const users = db.users;
const cards = db.cards;

router.get("/", async(req, res) => {
    
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
            results["user"] = user.userName;
        }

        res.render("cards/index", results);

    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

module.exports = router;
