import {
  LOGIN,
  LOGOUT,
  ADD_ARTIST,
  GET_ARTISTS,
  ADD_ARTIST_FROM_PLAYLIST,
  DELETE_ARTIST
} from './types'
import axios from 'axios'

export const login = (token) => (dispatch, getState) => {
  axios.get('/api/me',
    {
      params: { access_token: token },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => {
    console.log(res.data)
    dispatch({
      type: LOGIN,
      payload: {
        userId: res.data.id,
        accessToken: token,
        artists: res.data.artists,
        modifyPlaylist: res.data.modifyPlaylist,
        playlistId: res.data.playlistID
      }
    })
  })
}

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT
  })
}

export const getArtists = (artists) => dispatch => {
  dispatch({
    type: GET_ARTISTS,
    payload: artists
  })
}

export const addNewArtist = (artist) => (dispatch, getState) => {
  axios({
    method: 'put',
    url: '/api/artists/add',
    Accept: 'application/json',
    params: {
      "artist": artist
    }
  }).then((res) => {
    dispatch({
      type: ADD_ARTIST,
      payload: artist
    })
  })
}

export const deleteArtist = (artist) => (dispatch, getState) => {
  axios({
    method: 'delete',
    url: '/api/artists/delete',
    Accept: 'application/json',
    params: {
      "artist": artist
    }
  }).then((res) => {
    dispatch({
      type: DELETE_ARTIST,
      payload: artist
    })
  })
}

export const addArtistsFromPlaylist = (token, playlist) => (dispatch, getState) => {

  const payload = {
    playlist: playlist.id,
    userId: playlist.userId,
    token: token
  }
  axios({        
    method: 'put',
    url: '/api/playlist/add',
    data: payload,
  }).then((res) => {
    dispatch({
      type: ADD_ARTIST_FROM_PLAYLIST,
      payload: res.data
    })
  })
}
