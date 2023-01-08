const mongoose = require("mongoose");
require("dotenv").config();


mongoose.set("strictQuery", false);

const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
  };
  try {
    mongoose.connect(
      process.env.DB_URI,
      connectionParams
    );

    console.log("Database conected");
  } catch (error) {}
};

module.exports = database;
