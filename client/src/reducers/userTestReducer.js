import { initialState } from './initialState';
import { CHANGE_LOGIN_DATA} from '../actions/postActionIndex';

const postTestReducer = (state = initialState.data, action) => {
  const newState = [...state];
  console.log(newState);
  switch (action.type) {
    case CHANGE_LOGIN_DATA:
       return Object.assign({}, state, {
        logIn: true
      });
    default:
      return state;
  }
};

export default postTestReducer;
