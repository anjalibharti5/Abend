const express = require("express");
const router = express.Router({});

router.use("/", require("./abendDataRoutes"));

module.exports = router;
