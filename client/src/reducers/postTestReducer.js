import { initialState } from './initialState';
import { ALL_POST_TEST } from '../actions/postActionIndex';

const postTestReducer = (state = initialState.data, action) => {
  const newState = [...state];
  console.log(newState);
  switch (action.type) {
    case ALL_POST_TEST:
      // return Object.assign({}, state, {
      //   items: action.payload.items
      // });
    default:
      return state;
  }

  return newState;
};

export default postTestReducer;
