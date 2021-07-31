import {
  LOGIN,
  LOGOUT,
  GET_ARTISTS,
  ADD_ARTIST_FROM_PLAYLIST,
  ADD_ARTIST,
  DELETE_ARTIST
} from '../actions/types'

const initialState = {
  userId: '',
  accessToken: '',
  artists: []
}

const userReducer = function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...action.payload
      }
    case LOGOUT:
      return {
        accessToken: '',
        userId: '',
        artists: []
      }
    case GET_ARTISTS:
    case ADD_ARTIST_FROM_PLAYLIST:
      return {
        ...state,
        artists: action.payload
      }
    case ADD_ARTIST:
      return {
        ...state,
        artists: [...state.artists, action.payload]
      }
    case DELETE_ARTIST:
      return {
        ...state,
        artists: state.artists.filter(artist => artist.id !== action.payload.id)
      }
    default:
      return state
  }
}

export default userReducer;