// action types
export const ALL_POST_TEST = 'ALL_POST_TEST';

// actions creator functions

export const allPostTest = (a) => {
  return {
    type: ALL_POST_TEST,
    payload: a,
  };
};
