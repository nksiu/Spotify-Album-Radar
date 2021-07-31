const mongoose = require("mongoose");

let artistRelease = new mongoose.Schema({
  artistId: {type: String, unique: true},
  releases: []
});

let trackedArtists = mongoose.model("trackedArtists", artistRelease);

module.exports = trackedArtists;
