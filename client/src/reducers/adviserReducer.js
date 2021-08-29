import { adviserInitialState } from './initialState';
import { HANDLE_ADVISERPROFILE_IMG, GET_TOP_ADVISERS } from '../actions/adviserActionIndex';

const adviserReducer = (state = adviserInitialState, action) => {
  const newState = { ...state };
  // console.log(newState);

  switch (action.type) {
    case GET_TOP_ADVISERS:
      return { ...newState, topAdvisers: action.payload };

    case HANDLE_ADVISERPROFILE_IMG:
      newState.adviserProfileImg.imgFile = action.payload.originFile;
      newState.adviserProfileImg.preview = action.payload.preview;

      return newState;

    default:
      return state;
  }
  // if (action.type === HANDLE_ADVISERPROFILE_IMG) {
  //   newState.adviserProfileImg.imgFile = action.payload.originFile;
  //   newState.adviserProfileImg.preview = action.payload.preview;

  //   return newState;
  // } else {
  //   return state;
  // }
};

export default adviserReducer;
