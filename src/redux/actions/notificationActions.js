import {CREATE_NOTIFICATION, MARK_NOTIFICATIONS_READ, SET_NOTIFICATIONS} from "../types";
import {instance} from "../../api";


export const createNotification = (postData) => (dispatch) => {
  instance.post('/notifications', postData)
    .then(({data}) => {
      dispatch({
        type: CREATE_NOTIFICATION,
        payload: data
      });
    })
    .catch(err => console.log(err));
}

export const getUserNotifications = () => (dispatch) => {
  instance.get('/notifications')
    .then(({data}) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: data
      });
    })
    .catch(err => console.log(err));
}

export const markNotificationsRead = (notificationIds) => dispatch => {
  instance.post('/notifications/mark', {ids: notificationIds})
    .then(() => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));

}


