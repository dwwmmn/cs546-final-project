
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    // TODO
    if (req.user) {
        
    } else {
        res.redirect("/login");
    }
});

router.get("/decks", async(req, res) => {
    try {
        let results = {};
        let deckList = await decks.getDecksByOwner(req.params.userId);

        results["decks"] = deckList;

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
