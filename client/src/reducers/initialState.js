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
  filterPosts: [],
  searchPosts: [],
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
  isChat: false,
  viewChatlist: true,
};
