const mongoose = require("mongoose");

let artist = new mongoose.Schema({
  artistName: String,
  id: String,
});

let artistData = mongoose.model("artistData", artist);

module.exports = artistData;
