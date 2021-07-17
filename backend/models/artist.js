const mongoose = require("mongoose");

let artist = new mongoose.Schema({
  name: String,
  artistID: String,
});

let artistData = mongoose.model("artistData", artist);

module.exports = artistData;
