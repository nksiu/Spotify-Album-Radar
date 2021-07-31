const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const User = require("../../models/user");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.query.access_token) {
    res.redirect("http://localhost:5000/login");
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
          numDays: 200,
        });
        newUser
          .save()
          .then(() =>
            res.json({ id: data.data.id, name: data.data.display_name, artists: [] })
          );
      } else {
        res.json({ id: user[0].userID, name: user[0].user, artists: user[0].artists });
      }
    });
  }).catch((e) => {
    console.log("Error while grab user data, redirecting to home");
  });

  // Todo save: email: data.email, imgUrl: data.images.url
});

module.exports = router;
