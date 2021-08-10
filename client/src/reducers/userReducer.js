import { initialState } from './initialState';
import { SUCCESS_LOGIN } from '../actions/userActionIndex';

const postReducer = (state = initialState, action) => {
  const newState = { ...state };
  console.log(newState);

  if (action.type === SUCCESS_LOGIN) {
    return { ...state, logIn: true };
  } else {
    return state;
  }
};

export default postReducer;
