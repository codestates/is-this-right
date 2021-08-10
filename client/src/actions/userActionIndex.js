// action types
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';

// actions creator functions

export const successLogIn = () => {
  console.log('액션');
  return {
    type: SUCCESS_LOGIN,
  };
};
