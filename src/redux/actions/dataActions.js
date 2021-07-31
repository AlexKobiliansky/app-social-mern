import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM,
  LOADING_UI, SET_SCREAM, STOP_LOADING_UI
} from '../types';
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

export const postScream = (newScream, handleClose) => dispatch => {
  dispatch({type: LOADING_UI});
  instance.post(`/screams`, newScream)
    .then(({data}) => {
      dispatch({
        type: POST_SCREAM,
        payload: data
      });
      dispatch({type: CLEAR_ERRORS});
      handleClose();
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

export const deleteScream = (screamId) => dispatch => {
  instance.delete(`/screams/${screamId}`)
    .then(() => {
      dispatch({type: DELETE_SCREAM, payload: screamId})
    })
    .catch(err => console.log(err));
}

export const getScream = (screamId) => dispatch => {
  dispatch({type: LOADING_UI});
  instance.get(`/screams/${screamId}`)
    .then(({data}) => {
      dispatch({
        type: SET_SCREAM,
        payload: data
      });
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => console.log(err));
}