const Post = require("../db/models/Post.model");
const parseAllFeeds = require("../parser/rssParser");
const htmlParser = require("node-html-parser")

const isNewFeeds = (idFromDb, idFromSource) => {
  return idFromDb !== idFromSource;
};

const extractImageLink = (content) => {
  const contentFromRss = htmlParser.parse(content);
  const srcString = contentFromRss.childNodes[0].rawAttrs
    .replace("src=", '"', "")
  return srcString.substring(2, srcString.length - 2);
}

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
          imageLink: extractImageLink(content),
          content: feed.contentSnippet.replace("Read more...", ""),
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
