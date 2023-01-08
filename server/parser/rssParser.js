const Parser = require("rss-parser");

const parseAllFeeds = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL("https://lifehacker.com/rss");

  return feed.items;
};

module.exports = parseAllFeeds;
