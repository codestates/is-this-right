import { initialState } from './initialState';
import { SUCCESS_LOGIN, HANDLE_PROFILE_IMG, ADD_USER_INFO, ADD_SIGN_UP_INFO } from '../actions/userActionIndex';

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

  // if (action.type === SUCCESS_LOGIN) {
  //   return { ...newState, logIn: true };
  // } else if (action.type === HANDLE_PROFILE_IMG) {
  //   console.log('리듀서작동', action.payload);
  //   newState.userProfileImg.imaFile = action.payload.originFile;
  //   newState.userProfileImg.preview = action.payload.preview;

  //   return newState;
  // } else {
  //   return state;
  // }

  switch (action.type) {
    case SUCCESS_LOGIN:
      return { ...newState, logIn: true };
    case HANDLE_PROFILE_IMG:
      newState.userProfileImg.imaFile = action.payload.originFile;
      newState.userProfileImg.preview = action.payload.preview;
      return newState;
    case ADD_USER_INFO:
      return {
        ...newState,
        userInfo: action.payload,
      };
    case ADD_SIGN_UP_INFO:
      return {
        ...newState,
        signUpInfo: action.payload,
      };
    default:
      return newState;
  }
};

export default postReducer;
