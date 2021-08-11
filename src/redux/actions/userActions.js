import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  CLEAR_NOTIFICATIONS
} from "../types";
import {instance} from "../../api";
import {getUserNotifications} from "./notificationActions";

export const signupUser = (newUserData, history) => dispatch => {
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
      });
    });
}

export const loginUser = (userData, history) => dispatch => {
  dispatch({type: LOADING_UI});

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

export const logoutUser = () => dispatch => {
  dispatch({type: SET_UNAUTHENTICATED});
  dispatch({type: CLEAR_NOTIFICATIONS});
  localStorage.removeItem('socMernToken');
  delete instance.defaults.headers.common['Authorization'];
}

export const getUserData = () => dispatch => {
  dispatch({type: LOADING_USER});
  instance.get('/user')
    .then(({data}) => {
    dispatch({
      type: SET_USER,
      payload: data
    });
      dispatch(getUserNotifications());
  })
    .catch(err => console.log(err));
}

export const uploadImage = (formData) => dispatch => {
  dispatch({type: LOADING_USER});
  instance.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData())
  })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => dispatch => {
  dispatch({type: LOADING_USER});
  instance.post('/user', userDetails)
    .then(() => dispatch(getUserData()))
    .catch(err => console.log(err));
}

const setAuthorizationHeader = token => {
  const appToken = `Bearer ${token}`
  localStorage.setItem('socMernToken', appToken);
  instance.defaults.headers.common['Authorization'] = appToken;
}

