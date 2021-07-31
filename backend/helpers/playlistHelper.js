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
        // .then(res => {
        //   server_token = res.data.access_token;
        //   console.log(server_token)
        //   return server_token;
        // }).catch(() => {
        //     console.log('poggers');
        // })
        console.log(res.data.access_token);
    return res.data.access_token;
}

async function queryLatestRelease (id, spotifyToken) {
    console.log(spotifyToken);
    return await axios.get(
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
        filterDate.setDate(currDate.getDate() - 7);
        let filteredAlbums = albums.items.filter((album) => {
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
    }).catch(e => {
        console.log(e);
    });
}

function updateTrackedArtists(artistList) {
    console.log('hello');
    TrackedArtists.find({}, 'id').then((subscribed) => {
        artistList.forEach((artist) => {
            if (!subscribed.includes(artist.id)) {
                const token = await getSpotifyToken();
                queryLatestRelease(artist.id, token).then((artistReleases)=> {
                    let newTrackedArtist = new TrackedArtists({
                        artistId: artist.id,
                        releases: artistReleases,
                    });
                    newTrackedArtist.save();
                })
            }
        })
    }).catch(()=> {
        console.log('bad');
    });
}

const pullLatestReleases = () => {
    const spotifyToken = getSpotifyToken();
    TrackedArtists.find({}, 'id').then((artists) => {
        artists.forEach((artist) => {
            queryLatestRelease(artist.id, spotifyToken).then((artistReleases)=> {
                // update Entry under tracked Artist
                TrackedArtists.findOneAndUpdate({artistId: id}, {releases: artistReleases}, {
                    returnOriginal: false
                })
            });
        })
    })
}

module.exports = {updateTrackedArtists, pullLatestReleases};