
const express = require("express");
const router = express.Router();

router.get("/", (req, resp) => {
    // TODO check if logged in, return username
    // res.render("home/index", { username: ""});
});

module.exports = router;