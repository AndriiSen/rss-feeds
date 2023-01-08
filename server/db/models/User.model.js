const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
