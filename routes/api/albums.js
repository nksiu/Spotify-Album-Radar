const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require('../../models/user');

router.get("/", function (req, res) {
  let promises = [];
  let myData;
  if (req.query.artists == undefined) {
    res.send([]);
    return;
  } else {
    myData = JSON.parse(req.query.artists);
  }
  myData.forEach((artist) => {
    let promise = axios.get(
      `https://api.spotify.com/v1/artists/${artist.id}/albums`,
      {
        params: {
          limit: 25,
        },
        headers: {
          Authorization: req.headers.authorization,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    promises.push(promise);
  });

  Promise.allSettled(promises).then((resultArr) => {
    // Only handle fulfilled requests
    resultArr = resultArr.filter((result) => {
      if (result.status != 'fulfilled') {
        console.log("Request to retrieve song failed");
      }
      return result.status == "fulfilled"
    });

    let currDate = new Date();
    let filterDate = new Date();
    let userID = req.query.userID;
    User.findOne({ userID: userID }).then((data) => {
      let numDaysFilter = data.numDays;
      filterDate.setDate(currDate.getDate() - numDaysFilter);

      let retArr = [];
      resultArr = resultArr.map((result) => {
        let filteredAlbums = result.value.data.items.filter((album) => {
          let albumReleaseDate = new Date(album.release_date);
          return albumReleaseDate > filterDate && albumReleaseDate < currDate;
        });
        let cleanAlbums = filteredAlbums.map((album) => {
          return {
            image: album.images[0].url,
            name: album.name,
            release_date: album.release_date,
            url: album.external_urls.spotify,
          };
        });
        retArr.push({
          artistName: result.value.data.items[0].artists[0].name,
          songs: cleanAlbums,
        });
      });
      res.send(retArr);
    })
  });
});

router.get("/days", function (req, res) {
  let userID = req.query.userID;
  User.findOne({ userID: userID }).then((data) => {
    res.send({ numDays: data.numDays });
  })
});

router.put("/days", function (req, res) {
  let userID = req.query.userID;
  let newDays = req.query.days;
  if (!isNaN(newDays)) {
    User.findOneAndUpdate(
      { userID: userID },
      { numDays: newDays }
    ).then(() => res.send(newDays));
  } else {
    res.status(400);
    res.send("Bad Request, days must be number");
  }
});

module.exports = router;
