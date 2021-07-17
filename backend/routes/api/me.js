const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const User = require("../../models/user");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.params.access_token) {
    res.redirect("http://localhost:5000/login");
  }
  let data = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: "Bearer " + req.params.access_token },
  }).data;

  // Todo save: email: data.email, imgUrl: data.images.url
  let userId = data.id;
  User.find({ userID: userId }).then((user) => {
    if (user.length == 0) {
      let newUser = new User({
        user: data.display_name,
        userID: userId,
        artists: [],
      });
      newUser
        .save()
        .then(() =>
          res.json({ id: data.id, name: data.display_name, artists: [] })
        );
    } else {
      res.json({ id: data.id, name: data.display_name, artists: user.artists });
    }
  });
});

module.exports = router;
