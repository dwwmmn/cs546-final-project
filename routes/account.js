
const express = require("express");
const router = express.Router();

router.get("/account", (req, res) => {
    // TODO
    if (req.user) {
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
