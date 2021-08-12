const mongoose = require("mongoose");

let token = new mongoose.Schema({
  access: String,
  refresh: String,
});

let Token = mongoose.model("token", token);

module.exports = Token;
