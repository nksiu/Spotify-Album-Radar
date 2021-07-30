const express = require("express");
const request = require("request");
const axios = require("axios");
const querystring = require("querystring");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
mongoose.set('useFindAndModify', false);
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    "@cluster0.5g0ai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database is connected");
});

const redirect_uri =
  process.env.REDIRECT_URL || "http://localhost:5000/callback";

// API Endpoints
app.use("/api/albums", require("./routes/api/albums"));
app.use("/api/artists", require("./routes/api/artists"));
app.use("/api/me", require("./routes/api/me"));

app.get("/login", (req, res) => {
  var scopes = "user-read-private user-read-email";
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
      domain: "localhost",
      maxAge: 360000,
      httpOnly: false,
    });
    res.redirect(url);
  });
});

const port = process.env.PORT || 5000;
console.log(`Listening on port ${port}`);
app.listen(port);
