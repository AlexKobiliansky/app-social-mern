import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from "../types";
import {instance} from "../../api";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: LOADING_UI})

  instance.post('/user/signin', userData)
    .then(({data}) => {
      const token = `Bearer ${data.token}`
      localStorage.setItem('socMernToken', token);
      instance.defaults.headers.common['Authorization'] = token;
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS});
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
}

export const getUserData = () => (dispatch) => {
  instance.get('/user')
    .then(({data}) => {
    dispatch({
      type: SET_USER,
      payload: data
    })
  })
    .catch(err => console.log(err));
}