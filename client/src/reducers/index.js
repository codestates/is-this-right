import { combineReducers } from 'redux';
import postTestReducer from './postTestReducer';
import userTestReducer from './userTestReducer';

const rootReducer = combineReducers({
  postTestReducer,
  userTestReducer,
});

export default rootReducer;
