const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const User = require("../../models/user");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.query.access_token) {
    res.redirect("http://spotifyreleaseradar.herokuapp.com/login");
  }
  axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: "Bearer " + req.query.access_token },
  }).then((data) => {
    let userId = data.data.id;
    User.find({ userID: data.data.id }).then((user) => {
      if (user.length == 0) {
        let newUser = new User({
          user: data.data.display_name,
          userID: userId,
          artists: [],
          numDays: 365,
          modifyPlaylist: false,
          playlistID: "",
        });
        newUser
          .save()
          .then(() =>
            res.json({ id: data.data.id, name: data.data.display_name, artists: [] })
          );
      } else {
        res.json({ id: user[0].userID, name: user[0].user, artists: user[0].artists, modifyPlaylist: user[0].modifyPlaylist, playlistID: user[0].playlistID });
      }
    });
  }).catch((e) => {
    console.log("Error while grab user data, redirecting to home");
  });
});

module.exports = router;
