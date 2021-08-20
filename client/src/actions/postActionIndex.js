import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

// action types
export const UPLOAD_POST_IMGS = 'UPLOAD_POST_IMGS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const FILLTER_POSTS = 'FILLTER_POSTS';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const REMOVE_POST_IMG = 'REMOVE_POST_IMG';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
// actions creator functions

export const postImages = (originFile, preview) => {
  console.log('포스트 이미지-액션작동', originFile);
  return {
    type: UPLOAD_POST_IMGS,
    payload: { originFile, preview },
  };
};
export const removeImages = () => {
  return {
    type: REMOVE_POST_IMG,
  };
};

export const getAllPosts = () => async (dispatch) => {
  const data = await axios.get(`${url}/posts`).then((result) => result.data.data);
  dispatch(sendData(data));
  let filter = data.filter((el) => el.category === '헬스');
  dispatch(getCategoryPosts(filter));
};
export const sendData = (data) => {
  return {
    type: GET_ALL_POSTS,
    payload: data,
  };
};
export const filterPosts = (data) => {
  return {
    type: FILLTER_POSTS,
    payload: data,
  };
};
export const searchPosts = (data) => {
  return {
    type: SEARCH_POSTS,
    payload: data,
  };
};

export const getCategoryPosts = (data) => {
  return {
    type: CATEGORY_POSTS,
    payload: data,
  };
};
