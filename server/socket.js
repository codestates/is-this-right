module.exports = function (io) {
  const { message, sequelize } = require('./models');
  const { QueryTypes } = require('sequelize');
  const { addUser, removeUser, users, getUser } = require('./users');

  io.on('connection', (socket) => {
    socket.on('online', (userInfo) => {
      console.dir(userInfo);
      console.log('received: "' + userInfo + '" from client' + socket.id);
      socket.emit('online', 'Ok, i got it, ' + socket.id);

      addUser({ ...userInfo, socketId: socket.id });
    });

    socket.on('join', (data) => {
      // 방입장할때
      console.log('방 입장됨', data.room);
      socket.leaveAll();
      socket.join(socket.id);
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

      console.log(messageInfo, '여기메세지떠야하는뎅', response);
      io.to(messageInfo.room).emit('message', response);
      console.log('current users: ', users);
      let receiverOnline = getUser(receiver);
      if (receiverOnline) {
        console.log('sending online event to ', receiverOnline.socketId);
        io.to(receiverOnline.socketId).emit('online', 'update chat list');
      }
    });
    socket.on('disconnect', () => {
      console.log('disconnected from ', socket.id);
      //여기서 removeUser하기

      // removeUser(socket.id);
    });
  });
};
