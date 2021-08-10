const { user, chat, chats_user, message } = require('../../models');

module.exports = {
  get: async (req, res) => {
    //토큰을 받아서 유저정보를 획득 후
    //해당유저의 메세지 정보를 쿼리.
    // [{ roomId, partnerName, image, lastMessage, unreadMessageCount}] 를 클라에게 보내야함.

    let list = await message.findAll({
      include: { model: user },
      raw: true,
    });

    console.log('얘가리스트야', list);
    res.send(list);
  },
  post: async (req, res) => {
    //트레이너와 채팅하러 가기 버튼을 눌렀을때
    //채팅방을 하나 만들고 그방에 (이미 해당유저와 만들어진 방이있으면 클라에게 알려주기)
    //요청한 본인아이디와 초대한사람 아이디 추가.
    //

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
      sender: 'admin',
      receiver: req.body.user2.id,
      chatId: room.id,
      message: `${req.body.user1.username}님이 ${req.body.user2.username}님을 초대하셨습니다.`,
    });
    res.status(201).json({ message: 'create !' });
  },
};
