const express = require('express')
const request = require('request')
require('dotenv').config()

const router = express.Router()

// Endpoint for artist search, 
router.get('/artists', function(req,res) {
    const artistName = req.body;
    const authToken = getSearchAuthToken();
  
    const requestOptions = {
      url: 'https://api.spotify.com/v1/search',
      headers: {
        'Authorization': 'Bearer' + 
      }
    }
  
    var url = new URL('https://api.spotify.com/v1/search');
    url.searchParams = 
    request.get({url: , })
    
  })

  
// Retrieves a client credentials flow token to use for general spotify requests
// If token is not yet expired and exists, return current token, else generate and save new token
function getSearchAuthToken(){
  if ((!expiry_time) || (expiry_time.getTime() < Date.now().getTime()) || !server_token){
    const requestOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'))
      },
      json: true
    }
    request.post(requestOptions, function(err, response, body) {
        server_token = body.access_token;
    })
  } else {
    return server_token;
  }
}