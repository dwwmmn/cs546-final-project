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
const userName = 'me';
const decks = [
    {_id: '1', name: 'Deck 1', description: 'The best'},
    {_id: '2', name: 'Deck 2', description: 'The second best'}   
];

// Test HomePage - Logged In
app.get("/home_logged_in", (req, res) => {
    res.render('home/index', {userName: userName, decks: decks});
});

// Test HomePage - Not Logged In
app.get("/home_not_logged_in", (req, res) => {
    res.render('home/index', {decks: decks});
}); 

// 

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  })