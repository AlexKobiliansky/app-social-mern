import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import notificationsReducer from './reducers/notificationReducer';

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  notifications: notificationsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;