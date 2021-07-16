import {
  LOGIN,
  LOGOUT,
  GET_ARTISTS,
  ADD_ARTIST,
  DELETE_ARTIST
} from '../actions/types'

const initialState = {
  userId: '',
  accessToken: '',
  artists: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        accessToken: '',
        artists: []
      }
    case GET_ARTISTS:
      return {
        ...state,
        artists: action.payload
      }
    case ADD_ARTIST:
      return {
        ...state,
        artists: [...state.artists, action.payload]
      }
    default:
      return state
  }
}
