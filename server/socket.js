module.exports = function (io) {
  const { message, sequelize } = require('./models');
  const { QueryTypes } = require('sequelize');
  const { addUser, removeUser } = require('./users');

  io.on('connection', (socket) => {
    socket.on('online', (data) => {
      let { username, name, email, userId } = data;
      let user = { username, name, email, userId, socketId: socket.id };
      socket.emit('online', `${username}님이 입장하셨습니다. 소켓아이디 :  ${socket.id}`);
      console.log(username + '님이 입장하셨습니다. 소켓아이디 :' + socket.id);
      addUser(user);
    });

    socket.on('join', (data) => {
      // 방입장할때
      socket.join(data.room);
    });

    socket.on('sendMessage', async (messageInfo) => {
      const receiverInfo = await sequelize.query(
        `SELECT userId FROM chats_users WHERE chatId = ${messageInfo.room} AND NOT userId = ${messageInfo.sender}`,
        { type: QueryTypes.SELECT },
      );
      const receiver = receiverInfo[0].userId;

      const senderInfo = await sequelize.query(
        `SELECT IFNULL(advisers.name, users.username) as username, users.profileImg 
            FROM users LEFT JOIN advisers ON users.id = advisers.userId 
            WHERE users.id = ${messageInfo.sender}`,
        { type: QueryTypes.SELECT },
      );

      const createdMessage = await message.create({
        chatId: messageInfo.room,
        sender: messageInfo.sender,
        receiver,
        message: messageInfo.message,
      });

      const response = { ...createdMessage.dataValues, ...senderInfo[0] };

      console.log('여기메세지떠야하는뎅', response);
      io.to(messageInfo.room).emit('message', response);
    });
    socket.on('disconnect', () => {
      let data = removeUser(socket.id);
      if (data) {
        console.log(data.username + '님이 퇴장하셨습니다. 소켓아이디 :' + socket.id);
      }
    });
  });
};
