// action types
export const UPLOAD_POST_IMGS = 'UPLOAD_POST_IMGS';

// actions creator functions

export const postImages = (originFile, preview) => {
  console.log('포스트 이미지-액션작동', originFile);
  return {
    type: UPLOAD_POST_IMGS,
    payload: { originFile, preview },
  };
};
