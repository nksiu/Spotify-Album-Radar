const express = require('express')
const querystring = require('querystring')
const axios = require('axios');
const User = require('../../models/user')
const playlistHelper = require('../../helpers/playlistHelper');
require('dotenv').config()

const router = express.Router()

const queryLimit = 10;

let expiry_time = null;
let server_token = "";

const time = new Date();

// Endpoint for artist search, limited to ten results
// Will take in any string and user auth token and 
// return top ten artists satisfying query via Spotify API

// Retrieves a client credentials flow token to use for general spotify requests
// If token is not yet expired and exists, return current token, else generate and save new token
// Not used currently, but can be if we need a local server token
router.get('/', async function(req,res) {
  const artistName = req.query.q;
  let ret = [];

  //TODO: extract into helper function
  if ((!expiry_time) || (expiry_time < time.getTime()) || !server_token){
    await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials',
      }).then(res => {
        server_token = res.data.access_token;
        expiry_time = time.getTime() + res.data.expires_in * 60000;
        return res.data
      })
    } 
    
    const artistList = await axios({
      url: 'https://api.spotify.com/v1/search',
      headers: {
        'Authorization': "Bearer " + server_token
      },
      params: {
        "q": artistName,
        "type": "artist",
        "limit": queryLimit
      }
    }).then(response => {
      return response.data.artists.items;
    })

    ret = artistList.map(artist => {
        return {"label": artist.name, "value": artist.id}
    })

    res.json(ret);
  })

router.put('/add', (req, res) => {
  const newArtist = JSON.parse(req.query.artist)
  const myArtist = {
    artistName: newArtist.artistName,
    id: newArtist.id
  }
  playlistHelper.updateTrackedArtists([myArtist]);
  User.findOneAndUpdate(
    { userID: newArtist.userId },
    { $push: {artists: myArtist} }
    ).then(artist => res.json(artist))
})

router.delete('/delete', (req, res) => {
  const newArtist = JSON.parse(req.query.artist)
  const myArtist = {
    artistName: newArtist.artistName,
    id: newArtist.id
  }
  User.findOneAndUpdate(
    {userID: newArtist.userId},
    { $pull: {artists: myArtist}} 
    ).then(data => res.json({success: true}))
})

router.get('/playlists', async function(req, res) {
  const playlistList = await axios({
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      'Authorization': "Bearer " + req.query.token
    },
    params: {
      "limit": 30
    }
  }).then(response => {
    return response.data.items;
  })

  let ret = playlistList.map(playlist => {
    return {"label": playlist.name, "value": playlist.id}
  })
  res.json(ret);
})

router.get('/test', (req, res) => {
  playlistHelper.pullLatestReleases();
})

module.exports = router;