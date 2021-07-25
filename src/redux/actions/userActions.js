import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from "../types";
import {instance} from "../../api";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI})

  instance.post('/user/signup', newUserData)
    .then(({data}) => {
      setAuthorizationHeader(data.token)

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

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: LOADING_UI})

  instance.post('/user/signin', userData)
    .then(({data}) => {
      setAuthorizationHeader(data.token)
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

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('socMernToken');
  delete instance.defaults.headers.common['Authorization'];
  dispatch({type: SET_UNAUTHENTICATED});
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

const setAuthorizationHeader = (token) => {
  const appToken = `Bearer ${token}`
  localStorage.setItem('socMernToken', appToken);
  instance.defaults.headers.common['Authorization'] = appToken;
}