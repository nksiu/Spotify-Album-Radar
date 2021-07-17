const express = require("express");
const router = express.Router();
const axios = require("axios");

// How many days ago to look for new albums. Default: 7
let numDaysFilter = 200;

router.get("/", function (req, res) {
  // mock data
  const mock = [
    {
      artistName: "Ariana Grande",
      id: "66CXWjxzNUsdJxJ2JdwvnR",
    },
    {
      artistName: "Justin Bieber",
      id: "1uNFoZAHBGtllmzznpCI3s",
    },
    {
      artistName: "Emotional Oranges",
      id: "12trz2INGglrKMzLmg0y2C",
    },
  ];
  let promises = [];
  let myData;
  if (req.query.artists == undefined) {
    myData = mock;
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
    resultArr = resultArr.filter((result) => result.status == "fulfilled");

    let currDate = new Date();
    let filterDate = new Date();
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
  });
});

router.put("/days/:days", function (req, res) {
  let newDays = req.params.days;
  if (!isNaN(newDays)) {
    numDaysFilter = newDays;
    res.send(newDays);
  } else {
    res.status(400);
    res.send("Bad Request, days must be number");
  }
});

module.exports = router;
