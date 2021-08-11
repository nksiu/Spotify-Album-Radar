const express = require('express')
const querystring = require('querystring')
const axios = require('axios');
const User = require('../../models/user')
require('dotenv').config()

const playlistHelper = require('../../helpers/playlistHelper');

const router = express.Router();

// Endpoint for artist search, limited to ten results
// Will take in any string and user auth token and 
// return top ten artists satisfying query via Spotify API

router.put('/add', express.json(), async function(req,res) {

    let profileID = req.body.userId;

    const playlistID = req.body.playlist;

    let ret = [];
      
    const playlistTracks = await axios({
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        headers: {
            'Authorization': "Bearer " + req.body.token
        },
        params: {
            "market": "CA"
        }
        }).then(response => {
        return response.data.items;
    })

    // We make the choice to only add the primary artist on each track
    // This means that featured + collaborative artists will not be added
    let artists = playlistTracks.map((playlistEntry) => {
        return {
        "artistName": playlistEntry.track.artists[0].name,
        "id": playlistEntry.track.artists[0].id,
        };
    })

    playlistHelper.updateTrackedArtists(artists);
    
    User.findOne({userID: profileID}, 'artists').then((userSubscribedArtists) => {

      let subscribedArtists = new Map();
  
      userSubscribedArtists.artists.forEach((artist) => {
        subscribedArtists.set(artist.id, artist.artistName);
      })
      
      artists.forEach((artist) => {
        subscribedArtists.set(artist.id, artist.artistName);
      })
  
      let updatedArtistList = [];
      subscribedArtists.forEach((value, key) => {
          updatedArtistList.push({"artistName": value, "id": key});
      })
      updatedArtistList.sort((e1, e2)=> {
        return e1.artistName.localeCompare(e2.artistName);
      });


      User.findOneAndUpdate({userID: profileID}, {artists: updatedArtistList}, {
        returnOriginal: false
      })
      .then(entries => res.json(entries.artists));
    });
})

module.exports = router;