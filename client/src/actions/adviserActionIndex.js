export const HANDLE_ADVISERPROFILE_IMG = 'HANDLE_ADVISERPROFILE_IMG';

export const adviserProfileImg = (originFile, preview) => {
  console.log('액션작동', originFile);
  return {
    type: HANDLE_ADVISERPROFILE_IMG,
    payload: { originFile, preview },
  };
};
