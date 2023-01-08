const express = require("express");
const postsController = require("../controllers/posts.controller");

const router = express.Router();

router.get("/", postsController.getAllPosts);
router.post("/", postsController.addNewPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deleteRecord);

module.exports = router;
