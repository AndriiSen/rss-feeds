const User = require("../db/models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    user.save();

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    res.send("Something went wrong!");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );

      res.json(token);
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.send("Something went wrong!");
  }
};
