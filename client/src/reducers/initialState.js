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
};

export const postInitialState = {
  posts: [],
  postImgs: {
    imgFile: [],
    preview: '',
  },
};

export const chatInitialState = {
  currentRoom: '',
  chatList: [],
  socket: null,
  messages: [],
};
