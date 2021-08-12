const TrackedArtists = require('../models/trackedArtists');
const User = require('../models/user');
const Token = require('../models/token');
const axios = require('axios');
require('dotenv').config();

const refreshToken = () => {
    return Token.findOne().then(dbRes => {
        return axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              'Authorization': 'Basic ' + (new Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
              ).toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: `grant_type=refresh_token&refresh_token=${dbRes.refresh}`,
        }).then(ret => {
            return Token.findOneAndUpdate({refresh: dbRes.refresh}, {access: ret.data.access_token}, {
                returnOriginal: false
            }).then(() => {
                return ret.data.access_token;
            })
        }).catch(e => {
            console.error(e);
        })
    });
}

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
            include_groups: "album,single",
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
                albumId: album.id,
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

const pullLatestReleases = (spotifyToken) => {
    TrackedArtists.find({}, 'artistId').then((artists) => {
        artists.forEach((artist) => {
            queryLatestRelease(artist.artistId, spotifyToken).then((artistReleases)=> {
                // update Entry under tracked Artist
                TrackedArtists.findOneAndUpdate({artistId: artist.artistId}, { releases: artistReleases}, {
                    returnOriginal: false
                }).then();
            });
        })
    }).catch(() => {
        console.log('failed to fetch from db');
    })

    return TrackedArtists.find({}).then((artists) => {
        return artists;
    });
}

const getAlbumTracks = (albumId, spotifyToken) => {
    return axios.get(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        {
          params: {
            limit: 50,
          },
          headers: {
            Authorization: "Bearer " + spotifyToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
    ).then((res) => {
        return res.data.items.map((track) => {
            return track.uri;
        })
    })
}

const addTracksToPlaylist = (spotifyToken, tracks, playlistID) => {
    return axios({
        method: 'post',
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        headers: {
            Authorization: "Bearer " + spotifyToken,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: {
            uris: tracks,
        }
    }).then((snapshot) => {
        return snapshot.snapshot_id;
    }).catch((e) => {
        console.log(e);
    })
}


const cronJob = () => {
    return refreshToken().then((newToken) => {
        return getSpotifyToken().then(token => {
            pullLatestReleases(token).then((res) => {
            const newReleases = res.filter((trackedArtist) => {
                return trackedArtist.releases.length != 0;
            });
            User.find({}, 'artists modifyPlaylist playlistID').then((result) => {
                const usersToUpdate = result.filter(user => user.modifyPlaylist);
                usersToUpdate.forEach((user) => {
                    user.artists.forEach((artist) => {
                        // Finds if artist exists
                        const found = newReleases.find((release)=> {
                            return release.artistId == artist.id;
                        });
                        // Add newRelease to corresponding user's playlist
                        if (found) {
                            found.releases.forEach((song) => {
                                getAlbumTracks(song.albumId, token).then(tracks => {
                                    // Add tracks to playlist.
                                    addTracksToPlaylist(newToken, tracks, user.playlistID).then();
                                })
                            })
                        }
                    });
                })
            })
            });
            return {success: true};
        }).catch((e)=> {
            return {success: false, error: e};
        });
    })
    
    
}
module.exports = {updateTrackedArtists, pullLatestReleases, cronJob};