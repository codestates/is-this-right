import { postInitialState } from './initialState';
import { UPLOAD_POST_IMGS } from '../actions/postActionIndex';

const postReducer = (state = postInitialState, action) => {
  console.log(state);
  const newState = { ...state };
  if (action.type === UPLOAD_POST_IMGS) {
    if (!newState.postImgs.imgFile.filter((el) => el.uid === action.payload.originFile.uid).length) {
      newState.postImgs.imgFile = [...newState.postImgs.imgFile, action.payload.originFile];
      newState.postImgs.preview = action.payload.preview;
    }

    return newState;
  }

  return state;
};

export default postReducer;
