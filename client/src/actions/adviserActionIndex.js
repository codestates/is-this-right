import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const HANDLE_ADVISERPROFILE_IMG = 'HANDLE_ADVISERPROFILE_IMG';
export const GET_TOP_ADVISERS = 'GET_TOP_ADVISERS';

export const adviserProfileImg = (originFile, preview) => {
  return {
    type: HANDLE_ADVISERPROFILE_IMG,
    payload: { originFile, preview },
  };
};

export const getTopAdvisers =
  (category = '헬스') =>
  async (dispatch) => {
    const data = await axios.get(`${url}/top10?category='${category}'`).then((result) => result);
    console.log('데이타야', data);
    dispatch(sendTopAdviserS(data.data.data));
  };

export const sendTopAdviserS = (data) => {
  return {
    type: GET_TOP_ADVISERS,
    payload: data,
  };
};
