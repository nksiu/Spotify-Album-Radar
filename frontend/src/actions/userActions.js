import {
  LOGIN,
  LOGOUT,
  ADD_ARTIST,
  GET_ARTISTS
} from './types'

export const login = (token) => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
    payload: token
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
