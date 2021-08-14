import { adviserInitialState } from './initialState';
import { HANDLE_ADVISERPROFILE_IMG } from '../actions/adviserActionIndex';

const adviserReducer = (state = adviserInitialState, action) => {
  const newState = { ...state };
  // console.log(newState);
  console.log(newState);
  if (action.type === HANDLE_ADVISERPROFILE_IMG) {
    console.log('리듀서작동', action.payload.originFile);
    // let boolean = true;

    // newState.adviserProfileImg.imgFile.forEach((el) => {
    //   if (el.uid === action.payload.originFile.uid) {
    //     return (boolean = false);
    //   }
    // });

    // if (boolean) {
    //   newState.adviserProfileImg.imgFile = [...newState.adviserProfileImg.imgFile, action.payload.originFile];
    //   newState.adviserProfileImg.preview = action.payload.preview;
    // }
    newState.adviserProfileImg.imgFile = action.payload.originFile;
    newState.adviserProfileImg.preview = action.payload.preview;

    return newState;
  } else {
    return state;
  }
};

export default adviserReducer;
