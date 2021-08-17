const users = [];

const addUser = (data) => {
  const name = data.name || data.username;
  const existingUser = users.find((user) => user.name === name);
  if (existingUser) return;
  const user = data;
  users.push(user);
  console.log(users);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, users };
