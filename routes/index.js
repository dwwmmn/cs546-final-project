//import { homedir } from "os";

const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");

/* Require different routes */
const accountRoutes = require("./account.js");
const homeRoutes = require("./home.js");
const createAuthdRoute = require("./login.js");
//const searchRoutes = require("./search.js");
const cardRoutes = require("./cards.js");
const deckRoutes = require("./decks.js");
const signupRoutes = require("./signup.js");

const setupLocalStrategy = require("./localStrategy.js");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

module.exports = (app) => {
    app.use(session({
        secret: "don't touch my key, government!",
        resave: false,
        saveUninitialized: true
        // cookie: { secure: true }
    }));

    setupLocalStrategy(passport);

    app.use(passport.initialize());
    app.use(passport.session());
    
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

    /* Handlebars */
    app.engine("handlebars", handlebarsInstance.engine);
    app.set('view engine', 'handlebars');
    app.set("views", __dirname + "/../views/");
    
    /* Tell router to populate req.body */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());    

    /* Assign routes to application */
    app.use("/account", accountRoutes);
    app.use("/", homeRoutes);
    app.use("/login", createAuthdRoute(passport));
    app.use("/signup", signupRoutes);
    app.use("/cards", cardRoutes);
    app.use("/decks", deckRoutes);
};
