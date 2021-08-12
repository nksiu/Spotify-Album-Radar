const express = require("express");
const request = require("request");
const cors = require("cors");
const mongoose = require("mongoose");
const Token = require("./models/token");
const axios = require('axios');
const CronJob = require('cron').CronJob;
const playlistHelper = require('./helpers/playlistHelper');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@cluster0.5g0ai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database is connected");
});

const redirect_uri =
  process.env.REDIRECT_URL || "http://localhost:5000/callback";

const manual_redirect_uri =
  process.env.MANUAL_REDIRECT || "http://localhost:5000/refreshToken";

// API Endpoints
app.use("/api/albums", require("./routes/api/albums"));
app.use("/api/artists", require("./routes/api/artists"));
app.use("/api/me", require("./routes/api/me"));
app.use("/api/playlist", require("./routes/api/playlist"));

app.get("/login", (req, res) => {
  var scopes = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(redirect_uri)
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
          ":" +
          process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, async (err, response, body) => {
    const access_token = body.access_token;
    const url = process.env.FRONTEND_URL || "http://localhost:3000";
    res.cookie("access_token", access_token, {
      domain: process.env.NODE_ENV === 'production' ? 'spotifyreleaseradar.herokuapp.com' : 'localhost',
      maxAge: 360000,
      httpOnly: false,
    });
    res.redirect(url);
  });
});

app.get("/manualRefresh", (req, res) => {
  var scopes = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(manual_redirect_uri)
  );
});

// Callback endpoint for a manual server token refresh
app.get("/refreshToken", (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri: manual_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
          ":" +
          process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, async (err, response, body) => {
    console.log(body);
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;
    const url = process.env.FRONTEND_URL || "http://localhost:3000";
    Token.deleteMany().then((ret) => {
      let newToken = new Token({
        access: access_token,
        refresh: refresh_token
      })
      newToken.save();
      res.redirect(url);
    });
  });
})

// Cronjob every friday at 5PM
let job = new CronJob('0 5 * * 5', playlistHelper.cronJob);
job.start();

const port = process.env.PORT || 5000;
console.log(`Listening on port ${port}`);
app.listen(port);
