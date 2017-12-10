import { homedir } from "os";

const bodyParser = require("body-parser");

/* Require different routes */
const accountRoutes = require("./account.js");
const homeRoutes = require("./home.js");
const loginRoutes = require("./login.js");
const searchRoutes = require("./search.js");

require("./localStrategy.js");

module.exports = (app) => {
    /* Tell router to populate req.body */
    app.use(bodyParser.json());

    /* Assign routes to application */
    app.use("/account", accountRoutes);
    app.use("/", homeRoutes);
    app.use("/login", loginRoutes);
    app.use("/search", searchRoutes);
};
