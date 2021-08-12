import { initialState } from './initialState';
import { SUCCESS_LOGIN, HANDLE_PROFILE_IMG } from '../actions/userActionIndex';

// initialState = {
//   logIn: false,
//   adviser: {},
//   adviserData: [],
//   posts: [],
//   userProfileImg: {
//     imaFile: '',
//     preview: '',
//   },
// };

const postReducer = (state = initialState, action) => {
  const newState = { ...state };
  // console.log(newState);

  if (action.type === SUCCESS_LOGIN) {
    return { ...newState, logIn: true };
  } else if (action.type === HANDLE_PROFILE_IMG) {
    console.log('리듀서작동', action.payload);
    newState.userProfileImg.imaFile = action.payload.originFile;
    newState.userProfileImg.preview = action.payload.preview;

    return newState;
  } else {
    return state;
  }
};

export default postReducer;
