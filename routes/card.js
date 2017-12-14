const express = require("express");
const router = express.Router();
const db = require("../db/");
const users = db.users;
const cards = db.cards;
const exampleCards = [
    {
        _id: "6a30812d-c25b-458c-a3ff-2df67bd35d2d",
        name: "ExampleCard1",
        effect: "This is an example effect.",
        cost: 1,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "c3f3aa1b-555c-4975-8c19-3a8c24b324c0",
        name: "ExampleCard2",
        effect: "This is an example effect.",
        cost: 2,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "0afff847-4ede-454d-ab41-c094d3ca31d4",
        name: "ExampleCard3",
        effect: "This is an example effect.",
        cost: 3,
        power: 3,
        rarity: 0.5
    },
    {
        _id: "18954f72-4a7f-486a-8738-cf957ae2d904",
        name: "ExampleCard4",
        effect: "This is an example effect.",
        cost: 4,
        power: 4,
        rarity: 0.5
    },
    {
        _id: "56131d89-44a8-46d9-914c-af06a5ab4f58",
        name: "ExampleCard5",
        effect: "This is an example effect.",
        cost: 4,
        power: 5,
        rarity: 0.5
    }
];

// TODO 
router.get("/", async(req, res) => {
    try {
        let results = {};
        let card = await cards.getCards();
        //results["cards"] = cards;
        results["cards"] = exampleCards;

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }
        res.render("cards/index", results);

    } catch (err) {
        console.log(err);
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
        //results["card"] = exampleCards[0];

        if (req.user) {
            let user = await users.getUser(req.user._id);
            results["userName"] = user.userName;
        }


        res.render("cards/instance", results);

    } catch (err) {
        res.status(404).json({message: "Something went wrong"});
    }
});

module.exports = router;
