import {MARK_NOTIFICATIONS_READ, SET_NOTIFICATIONS} from "../types";
import {instance} from "../../api";

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
  console.log('userActions - marked notifications', notificationIds)
  instance.post('/notifications/mark', {ids: notificationIds})
    .then(({data}) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));

}


