let users = [];

const addUser = (userInfo) => {
  users = users.filter((user) => user.id !== userInfo.id);
  if (!users.filter((user) => user.socketId === userInfo.socketId).length) {
    users.push(userInfo);
  }
  console.log(users, ' added');
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  let deleted = users.splice(index, 1)[0];
  console.log(deleted, ' deleted');
  console.log(users);
};

const getUser = (id) => users.find((user) => user.id === id);
const getUsers = () => users;

module.exports = { addUser, removeUser, getUsers, getUser };
