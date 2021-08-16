import { combineReducers } from 'redux';
import postReducer from './postReducer';
import adviserReducer from './adviserReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  // postTestReducer,
  userReducer,
  adviserReducer,
  postReducer,
  chatReducer,
});

export default rootReducer;
