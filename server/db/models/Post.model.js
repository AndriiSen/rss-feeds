const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  isManual: Boolean,
  available: Boolean,
  creator: String,
  title: String,
  link: String,
  pubDate: String,
  content: String,
  imageLink: String,
  guid: String,
  categories: Array,
});

const Post = new mongoose.model("Posts", postSchema);

module.exports = Post;
