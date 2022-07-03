const express = require("express");
const { createUrl, getUrls, getUrl } = require("../controllers");
const router = express.Router();

router.post("/", createUrl);
router.get("/", getUrls);
router.get("/:shortUrl", getUrl);

module.exports = router;
