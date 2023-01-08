const express = require("express");

const postRouter = require("./post.routes");
const authRouter = require("./auth.routes");
const auth = require("../middleware/auth");

const router = express.Router();

router.use("/post", auth, postRouter);
router.use("/", authRouter);

module.exports = router;
