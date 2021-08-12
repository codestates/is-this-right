// action types
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const HANDLE_PROFILE_IMG = 'HANDLE_PROFILE_IMG';

// actions creator functions

export const successLogIn = () => {
  return {
    type: SUCCESS_LOGIN,
  };
};

export const userProfileImg = (originFile, preview) => {
  console.log('액션작동');
  return {
    type: HANDLE_PROFILE_IMG,
    payload: { originFile, preview },
  };
};
