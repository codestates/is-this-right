module.exports = function (io) {
  const { message, sequelize } = require('./models');
  const { QueryTypes } = require('sequelize');
  const { addUser, getUser, getUsers, removeUser } = require('./users');

  io.on('connection', (socket) => {
    socket.on('online', (userInfo) => {
      if (userInfo) {
        console.dir(userInfo);
        console.log('received: "' + userInfo + '" from client' + socket.id);
        socket.emit('online', 'Ok, i got it, ' + socket.id);

        addUser({ ...userInfo, socketId: socket.id });
        console.log('추가를 했는데 이게 들어왔을까? current users from online:', getUsers());
      }
    });
    socket.on('quitRoom', (data) => {
      socket.leaveAll();
      socket.join(socket.id);
      console.log('현재 참여중인 채널 목록:', socket.rooms);
    });
    socket.on('join', (data) => {
      // 방입장할때
      console.log('방 입장됨', data.room);
      socket.leaveAll();
      socket.join(socket.id);
      socket.join(data.room);

      console.log('현재 참여중인 채널 목록:', socket.rooms);
    });

    socket.on('sendMessage', async (messageInfo) => {
      console.log('여기는 SendMessage On, 방금 메세지 받았어', messageInfo);
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

      console.log(messageInfo, '여기메세지떠야하는뎅', response, ' receiver 는 >', receiver);
      console.log('sendMessage On 인데, emit message 받을 채널은?:', socket.rooms);
      io.to(messageInfo.room).emit('message', response);
      console.log('current users from messages: ', getUsers());
      let receiverOnline = getUser(receiver);
      console.log('Online Receiver Info', receiverOnline);
      if (receiverOnline) {
        console.log('sending online event to ', receiverOnline.socketId);
        io.to(receiverOnline.socketId).emit('online', 'update chat list');
      }
    });
    socket.on('logout', () => {
      removeUser(socket.id);
      console.log('current users on logout: ', getUsers());
    });
    socket.on('disconnect', () => {
      console.log('disconnected from ', socket.id);
      // removeUser(socket.id);
    });
  });
};
