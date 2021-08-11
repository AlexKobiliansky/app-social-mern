import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT, UPDATE_LIKES_ON_SCREAM
} from "../types";

const initialState = {
  screams: [],
  scream: {
    comments: []
  },
  isLoading: false
};

 function dataReducer(state = initialState, action) {
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex((scream) => scream._id === action.payload._id);
      state.screams[index] = action.payload;
      if(state.scream._id === action.payload._id) {
        state.scream = action.payload
      }
      return {
        ...state,
      }
    }
    case UPDATE_LIKES_ON_SCREAM:
      return {
        ...state,
        screams: state.screams.map(scream => {
          if (scream._id !== action.payload._id) return scream;

          const updatedScream = {
            ...scream,
            likesCount: action.payload.likesCount
          }

          return updatedScream;
        })
      }

    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(scream => scream._id !== action.payload)
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map(scream => {
          if ( scream._id !== action.payload.scream._id) return scream;
          return {
            ...scream,
            commentsCount: scream.commentsCount + 1}
        }),
        scream: {
          ...state.scream,
          comments: [...state.scream.comments, action.payload.comment],
          commentsCount: state.scream.commentsCount + 1
        }
      }
    default:
      return state;
  }
}

export default dataReducer;