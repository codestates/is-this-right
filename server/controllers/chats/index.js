const { user, chat, chats_user, message } = require('../../models');

module.exports = {
  get: async (req, res) => {
    let list = await chats_user.findAll({ where: { userId: 1 } });

    res.send(list);
  },
  post: async (req, res) => {
    console.log(req.body);
    let room = await chat.create({}, { fields: [] });

    let roomlist = await chats_user.bulkCreate(
      [
        { chatId: room.id, userId: req.body.user1.id },
        { chatId: room.id, userId: req.body.user2.id },
      ],
      { fields: ['chatId', 'userId'] },
    );
    let createMessage = await message.create({
      sender: req.body.user1.id,
      receiver: req.body.user2.id,
      chatId: room.id,
      message: `${req.body.user1.username}님이 ${req.body.user2.username}님을 초대하셨습니다.`,
    });
    res.send('');
  },
};
