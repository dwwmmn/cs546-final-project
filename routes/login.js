const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login/index");
});

router.post("/", (req, resp) => {
    // TODO
});

module.exports = router;
