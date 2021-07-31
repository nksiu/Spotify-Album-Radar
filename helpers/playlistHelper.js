const TrackedArtists = require('../models/trackedArtists');
const axios = require('axios');

async function getSpotifyToken() {
    const res = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')),
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials',
        })
    return res.data.access_token;
}

function queryLatestRelease (id, spotifyToken) {
    return axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          params: {
            limit: 25,
          },
          headers: {
            Authorization: "Bearer " + spotifyToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
    ).then((albums)=> {
        let currDate = new Date();
        let filterDate = new Date();
        filterDate.setDate(currDate.getDate() - 30);
        let filteredAlbums = albums.data.items.filter((album) => {
            let albumReleaseDate = new Date(album.release_date);
            return albumReleaseDate > filterDate && albumReleaseDate < currDate;
        })

        let cleanAlbums = filteredAlbums.map((album) => {
            return {
                image: album.images[0].url,
                name: album.name,
                release_date: album.release_date,
                url: album.external_urls.spotify,
            };
        });
        return cleanAlbums;
    }).catch(() => {
        console.log("error retrieve new releases");
        return [];
    });
}

function updateTrackedArtists(artistList) {
    TrackedArtists.find({}, 'artistId').then((subscribed) => {
        const artistIds = subscribed.map((entry)=> {
            // Simply map mongo entries to id strings
            return entry.artistId;
        })
        artistList.forEach((artist) => {
            if (!artistIds.includes(artist.id)) {
                getSpotifyToken().then((token)=> {
                    queryLatestRelease(artist.id, token)
                    .then((artistReleases)=> {
                        let newTrackedArtist = new TrackedArtists({
                            artistId: artist.id,
                            releases: artistReleases,
                        });
                        newTrackedArtist.save();
                    })
                })
            }
        })
    }).catch(()=> {
        console.log('failed to fetch from db');
    });
}

const pullLatestReleases = () => {
    getSpotifyToken().then((spotifyToken)=> {
        TrackedArtists.find({}, 'artistId').then((artists) => {
            artists.forEach((artist) => {
                queryLatestRelease(artist.artistId, spotifyToken).then((artistReleases)=> {
                    // update Entry under tracked Artist
                    TrackedArtists.findOneAndUpdate({artistId: artist.artistId}, {releases: artistReleases}, {
                        returnOriginal: false
                    });
                });
            })
        }).catch(() => {
            console.log('failed to fetch from db');
        })
    }).catch(()=> {
        console.log("Failed to retrieve spotify token");
    });

    return TrackedArtists.find({}).then((artists) => {
        return artists;
    });
}

module.exports = {updateTrackedArtists, pullLatestReleases};