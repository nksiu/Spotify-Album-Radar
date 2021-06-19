const express = require('express')
const request = require('request')
const querystring = require('querystring')
require('dotenv').config()

const app = express()

const redirect_uri = process.env.REDIRECT_URL || 'http://localhost:5000/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  const code = req.query.code || null
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }

  request.post(authOptions, function(err, response, body) {
    const access_token = body.access_token
    const url = process.env.FRONTEND_URL || 'http://localhost:3000'
    res.cookie('access_token', access_token, {domain: 'localhost', maxAge: body.expires_in, httpOnly: false})
    res.redirect(url)
  })
})

const port = process.env.PORT || 5000
console.log(`Listening on port ${port}`)
app.listen(port)