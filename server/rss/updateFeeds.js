const Post = require("../db/models/Post.model");
const parseAllFeeds = require("../parser/rssParser");

const isNewFeeds = (idFromDb, idFromSource) => {
  return idFromDb !== idFromSource;
};

const updateFeeds = async () => {
  const rssFeeds = await parseAllFeeds();
  const feedsFromDb = await Post.find({ isManual: false });

  if (isNewFeeds(rssFeeds[0].guid === feedsFromDb[0]?.guid)) {
    const existingGuids = feedsFromDb.map((el) => el.guid);
    rssFeeds.forEach((feed) => {
      if (!existingGuids.includes(feed.guid)) {
        const { creator, title, link, pubDate, content, guid, categories } =
          feed;
        const date = new Date(pubDate);
        const post = new Post({
          isManual: false,
          available: true,
          creator,
          title,
          pubDate: date.toISOString(),
          link,
          content,
          guid,
          categories,
        });
        post.save();
      }
    });
  }

  return;
};

module.exports = updateFeeds;
