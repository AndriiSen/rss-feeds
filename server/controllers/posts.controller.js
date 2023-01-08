const Post = require("../db/models/Post.model");
const { v4 } = require("uuid");

exports.getAllPosts = async (req, res) => {
  const { sortBy, isDescendingOrder, filterBy, searchQuery, page } = req.query;
  const skip = page * 5;
  const limit = 10;
  const posts = await Post.find({
    available: true,
    title: {
      $regex: searchQuery || "",
      $options: "i",
    },
  })
    .skip(skip)
    .limit(limit);
  const isLastPage = posts.length < 10;
  res.send({ posts, isLastPage });
};

exports.addNewPost = async (req, res) => {
  const { creator, title, link, content, categories } = req.body;
  const date = new Date();
  try {
    const post = new Post({
      isManual: false,
      available: true,
      creator,
      title,
      link,
      pubDate: date.toISOString(),
      content,
      guid: v4(),
      categories,
    });
    post.save();
    res.send("Saved");
  } catch (e) {
    res.send("Something went wrong!");
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { creator, title, link, content, categories } = req.body;
  try {
    await Post.findOneAndUpdate(
      { _id: id },
      {
        creator,
        title,
        link,
        content,
        categories,
      }
    );
    res.send("ok");
  } catch (e) {
    res.send("Something went wrong!");
  }
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findOneAndUpdate(
      { _id: id },
      {
        available: false,
      }
    );
    res.send("archivated");
  } catch (e) {
    res.send("Something went wrong!");
  }
};
