import { combineReducers } from 'redux';
import postTestReducer from './postTestReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // postTestReducer,
  userReducer,
});

export default rootReducer;
