import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

// action types
export const UPLOAD_POST_IMGS = 'UPLOAD_POST_IMGS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
// actions creator functions

export const postImages = (originFile, preview) => {
  console.log('포스트 이미지-액션작동', originFile);
  return {
    type: UPLOAD_POST_IMGS,
    payload: { originFile, preview },
  };
};

export const getAllPosts = () => async (dispatch) => {
  const data = await axios.get(`${url}/posts`).then((result) => result.data.data);
  dispatch(sendData(data));
};
export const sendData = (data) => {
  return {
    type: GET_ALL_POSTS,
    payload: data,
  };
};
