const mongoose = require("mongoose");

let user = new mongoose.Schema({
  user: String,
  userID: String,
  artists: [],
  numDays: Number,
});

let userData = mongoose.model("userData", user);

module.exports = userData;
