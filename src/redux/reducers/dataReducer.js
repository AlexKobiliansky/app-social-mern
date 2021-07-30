import {SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM} from "../types";

const initialState = {
  screams: [],
  scream: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        isLoading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        isLoading: false
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex((scream) => scream._id === action.payload._id);

      state.screams[index] = action.payload;
      return {
        ...state,
      }
    }
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(scream => scream._id !== action.payload)
      }
    default:
      return state;
  }
}