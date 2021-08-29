const size = {
  mobile: '800px',
  avatar: '1100px',
  small: '900px',
  medium: '1300px',
};

const theme = {
  // mainColor: '#0a4297',
  mobile: `(max-width: ${size.mobile})`,
  avatar: `(max-width: ${size.avatar})`,
  medium: `(max-width: ${size.medium})`,
  small: `(max-width: ${size.small})`,
};

export default theme;
