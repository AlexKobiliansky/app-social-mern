import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM} from '../types';
import {instance} from "../../api";

export const getScreams = () => dispatch => {
  dispatch({type: LOADING_DATA});
  instance.get('/screams')
    .then(({data}) => {
      dispatch({
        type: SET_SCREAMS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const likeScream = (screamId) => dispatch => {
  instance.get(`/screams/${screamId}/like`)
    .then(({data}) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: data
      })
    })
    .catch(err => console.log(err));
}

export const unlikeScream = (screamId) => dispatch => {
  instance.get(`/screams/${screamId}/unlike`)
    .then(({data}) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: data
      })
    })
    .catch(err => console.log(err));
}