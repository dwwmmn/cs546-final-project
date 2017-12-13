const express = require("express");
const exphbs = require("express-handlebars");
const static = express.static(__dirname + "/public");
let configRoutes = require("./routes");

let app = express();

app.use("/public", static);
app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
configRoutes(app);

var server = app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});

//module.exports = server;
