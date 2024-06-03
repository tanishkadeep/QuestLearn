const express = require("express");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.post("/subtopic", authMiddleware, async (req, res) => {
    const title = req.body.title;

    
});

module.exports = router;