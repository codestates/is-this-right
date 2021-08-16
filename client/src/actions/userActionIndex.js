// action types
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const HANDLE_PROFILE_IMG = 'HANDLE_PROFILE_IMG';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_SIGN_UP_INFO = 'ADD_SIGN_UP_INFO';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
// actions creator functions

export const successLogIn = () => {
  return {
    type: SUCCESS_LOGIN,
  };
};

export const addUserInfo = (userInfo) => {
  return {
    type: ADD_USER_INFO,
    payload: userInfo,
  };
};

export const addSignUpInfo = (signUpInfo) => {
  return {
    type: ADD_SIGN_UP_INFO,
    payload: signUpInfo,
  };
};

export const userProfileImg = (originFile, preview) => {
  console.log('액션작동');
  return {
    type: HANDLE_PROFILE_IMG,
    payload: { originFile, preview },
  };
};

export const successLogout = () => {
  return {
    type: SUCCESS_LOGOUT,
  };
};
