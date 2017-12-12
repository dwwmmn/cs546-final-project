import { homedir } from "os";

const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

/* Require different routes */
const accountRoutes = require("./account.js");
const homeRoutes = require("./home.js");
const loginRoutes = require("./login.js");
const searchRoutes = require("./search.js");

require("./localStrategy.js");

module.exports = (app) => {
    /* Tell router to populate req.body */
    app.use(bodyParser.json());
    app.use(flash());    
    app.use(session({
        secret: "don't touch my key, government!",
        resave: false,
        saveUninitialized: true
        // cookie: { secure: true }
    }));

    app.use(passport.initialize());
    app.user(passport.session());

    setupLocalStrategy(passport);

    /* Assign routes to application */
    app.use("/account", accountRoutes);
    app.use("/", homeRoutes);
    app.use("/login", loginRoutes);
    app.use("/search", searchRoutes);
};
