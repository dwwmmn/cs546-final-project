const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    }
});

app.use(bodyParser.json());


app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

// Test Params
const userName = 'Drew the Destroyer';
const user = {
    "id": 0,
    "username": "Drew the Destroyer",
    "fullname": "Drew M",
    "about": "a boy",
    "email": "drew@stevens.edu"    
};
const decks = [
    {_id: '1', name: 'Deck 1', description: 'The best'},
    {_id: '2', name: 'Deck 2', description: 'The second best'}   
];
const cards = [
    {_id: '1', name: 'Mongod', effect: 'Kill Yourself'},
    {_id: '2', name: 'Matthew Crepea', effect: 'Write all of the handlebars'}
]

const pageNumber = '5';

// Test HomePage - Logged In
app.get("/", (req, res) => {
    res.render('home/index', {userName: userName, decks: decks});
});

// Test HomePage - Not Logged In
app.get("/", (req, res) => {
    res.render('home/index', {decks: decks});
}); 

// Test Decks Page - Logged In, Some Decks
app.get("/decks/", (req, res) => {
    res.render('decks/index', {userName: userName, decks: decks, pageNumber: pageNumber});
});

// Test Log In Page
app.get("/login/", (req, res) => {
    res.render('login/index', {});
});

// Test Account Page
app.get("/account/", (req, res) => {
    res.render('account/index', {userName: userName, user: user});
});

app.get("/signup/", (req, res) => {
    res.render('signup/index', {})
});

//Test card instance
card_obj = {
    name: "Mongod",
    effect: "Kill You.",
    cost: 5,
    power: 10,
    rarity: "Secret"
};

app.get("/cards_instance/", (req, res) => {
    res.render("cards/instance", card_obj)
});

deck_obj = {
    _id: 0,
    ownerName: 'Drew',
    description: 'A good deck',
    name: 'Drews Delectable Deck',
    rating: 10,

    cards: [
        {
            _id: 0,
            name: 'Drews best card'
        },
        {
            _id: 1,
            name: 'Drews other card'
        }
    ],

    userName: 'DrewDude'
};

deck_obj_2 = {
    _id: 1,
    ownerName: 'Drew',
    description: 'A great deck',
    name: 'Drews Decent Deck',
    rating: 6,

    cards: [
        {
            _id: 0,
            name: 'Drews best card'
        },
        {
            _id: 1,
            name: 'Drews other card'
        }
    ],

    userName: 'DrewDude'
};

decks = [
    deck_obj,
    deck_obj_2
];

app.get("/cards/", (req, res) => {
    res.render('cards/index', {userName: userName, cards: cards, })
});

//Test Deck Instance
app.get('/decks_instance/', (req, res) => {
    res.render("decks/instance", deck_obj);
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })