
const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    // TODO
    if (req.user) {
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
