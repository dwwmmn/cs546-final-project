const express = require("express");
let configRoutes = require("./routes");

let app = express();

configRoutes(app);

var server = app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});

module.exports = server;
