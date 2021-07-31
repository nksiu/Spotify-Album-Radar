const mongoose = require("mongoose");

let artistRelease = new mongoose.Schema({
  artistId: String,
  releases: []
});

let trackedArtists = mongoose.model("trackedArtists", artistRelease);

module.exports = trackedArtists;
