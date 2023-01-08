const express = require("express");
const database = require("./db/index.js");
const routes = require("./routes/index.js");
const updateFeeds = require("./rss/updateFeeds.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cron = require("node-cron");

database();
updateFeeds();
cron.schedule("* * * * *", () => {
  updateFeeds();
});
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const port = 8000;

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
