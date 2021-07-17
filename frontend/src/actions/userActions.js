import {
  LOGIN,
  LOGOUT,
  ADD_ARTIST,
  GET_ARTISTS
} from './types'
import axios from 'axios'

export const login = (token) => (dispatch, getState) => {
  axios.get('http://localhost:5000/api/me', 
    {
     params: { access_token: token },
     headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    }
  ).then((res) => {
    dispatch({
      type: LOGIN,
      payload: {
        userId: res.data.id,
        accessToken: token,
        artists: res.data.artists
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
  dispatch({
    type: ADD_ARTIST,
    payload: artist
  })
}
