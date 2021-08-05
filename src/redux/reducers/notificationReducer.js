import {
  CLEAR_NOTIFICATIONS,
  MARK_NOTIFICATIONS_READ,
  SET_NOTIFICATIONS,
  CREATE_NOTIFICATION
} from "../types";

const initialState = {
  notifications: [],
};

function notificationReducer(state = initialState, action) {
  switch(action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      }
    // case CREATE_NOTIFICATION:
    //   return {
    //     ...state,
    //     notifications: [
    //       action.payload,
    //       ...state.notifications
    //     ]
    //   }
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => not.read = true);
      return {
        ...state
      }
    default:
      return state;
  }
}

export default notificationReducer;