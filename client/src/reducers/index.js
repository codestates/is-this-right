import { combineReducers } from 'redux';
import postReducer from './postReducer';
import adviserReducer from './adviserReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // postTestReducer,
  userReducer,
  adviserReducer,
  postReducer,
});

export default rootReducer;
