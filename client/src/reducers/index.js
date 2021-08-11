import { combineReducers } from 'redux';
import postTestReducer from './postTestReducer';
import adviserReducer from './adviserReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // postTestReducer,
  userReducer,
  adviserReducer,
});

export default rootReducer;
