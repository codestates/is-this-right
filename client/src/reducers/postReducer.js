import { postInitialState } from './initialState';
import { GET_ALL_POSTS, UPLOAD_POST_IMGS } from '../actions/postActionIndex';

const postReducer = (state = postInitialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPLOAD_POST_IMGS:
      if (!newState.postImgs.imgFile.filter((el) => el.uid === action.payload.originFile.uid).length) {
        newState.postImgs.imgFile = [...newState.postImgs.imgFile, action.payload.originFile];
        newState.postImgs.preview = action.payload.preview;
      }
      return newState;

    case GET_ALL_POSTS:
      return {
        ...newState,
        posts: [...action.payload],
      };
    default:
      return state;
  }

  return state;
};

export default postReducer;
