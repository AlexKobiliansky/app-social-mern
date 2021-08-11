import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";

const initialState = {
  isLoading: false,
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

function userReducer(state = initialState, action) {
  switch(action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      }
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        isLoading: false,
        ...action.payload
      }
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      }
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            user: state.credentials._id,
            scream: action.payload.scream._id
          }
        ]
      }
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(like => like.scream !== action.payload.scream._id)
      }
    default:
      return state;
  }
}

export default userReducer;