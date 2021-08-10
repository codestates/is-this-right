module.exports = {
  users: require('./users'),
  advisers: require('./adivsers'),
  posts: require('./posts'),
  feedbacks: require('./feedbacks'),
  chats: require('./chats'),
  messages: require('./chats/messages'),
  auth: require('./users/auth'),
  signup: require('./users/signup'),
  signin: require('./users/signin'),
  signout: require('./users/signout'),
  postlist: require('./users/postlist'),
};
