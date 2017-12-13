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

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })