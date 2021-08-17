export const initialState = {
  logIn: false,
  userInfo: {},
  signUpInfo: {},
  adviser: {},
  adviserData: [],
  userProfileImg: {
    imaFile: '',
    preview: '',
  },
};

export const adviserInitialState = {
  adviserProfileImg: {
    imgFile: '',
    preview: '',
  },
  topAdvisers: [],
};

export const postInitialState = {
  posts: [],
  postImgs: {
    imgFile: [],
    preview: '',
  },
};
