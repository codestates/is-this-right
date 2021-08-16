const { user, chat, chats_user, message, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    //토큰을 받아서 유저정보를 획득 후
    //해당유저의 메세지 정보를 쿼리. .// 본인 아이디만 있음
    // [{ chatId, partnerName, image, lastMessage, unreadMessageCount}] 를 클라에게 보내야함.
    // 메세지에서 리시버가 나인걸 받아서, 샌더의 정보로 유저테이블 연결, 오더는 챗의 크리에이티드 엣으로 한다음에, 그룹을 챗아이디로 묶음.
    // 안읽은 메세지는 chats_users table의 updatedAt컬럼보다 늦은거 찾아서 카운트.< messages가 레프트조인할거라 ㄱㅊ
    // 마지막 메세지 null이면 빈문자열 넣어주기.
    // where messages.createdAt < chats_users.updatedAt
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      res.status(401).json({ message: 'Unauthorized request' });
    } else {
      const chatRoomList = await sequelize.query(
        `SELECT chats_users.chatId, IFNULL(advisers.name, users.username) as username, users.profileImg, users.id, lastMessages.message as lastMessage, IFNULL(unread.unreadMessageCount,0) as unreadMessageCount
        FROM (SELECT messages.chatId, messages.message 
          FROM messages 
          JOIN (SELECT max(createdAt) as lastCreate,chatId from messages group by chatId) latest 
          ON messages.createdAt = latest.lastCreate and messages.chatId = latest.chatId 
          WHERE messages.sender = ${userInfo.id} OR messages.receiver = ${userInfo.id}) lastMessages
        JOIN chats_users ON lastMessages.chatId = chats_users.chatId
        JOIN users ON users.id = chats_users.userId
        LEFT JOIN advisers ON users.id = advisers.userId
        LEFT JOIN (SELECT messages.chatId, COUNT(messages.message) as unreadMessageCount 
          FROM messages 
          JOIN chats_users 
          ON chats_users.chatId = messages.chatId AND chats_users.userId = messages.receiver 
          WHERE chats_users.updatedAt < messages.createdAt AND messages.receiver = ${userInfo.id} GROUP BY chatId) unread ON chats_users.chatId = unread.chatId
        WHERE NOT chats_users.userId = ${userInfo.id}
          `,
        { type: QueryTypes.SELECT },
      );
      res.status(200).json({ data: chatRoomList });
    }
  },
  post: async (req, res) => {
    //트레이너와 채팅하러 가기 버튼을 눌렀을때
    //채팅방을 하나 만들고 그방에 (이미 해당유저와 만들어진 방이있으면 클라에게 알려주기)
    //요청한 본인아이디와 초대한사람 아이디 추가.
    //그상황에서 유저가 채팅하러가기를 누른다...
    // sender, receiver <<
    //chats_users
    //SELECT COUNT(*) as exist FROM chats_users WHERE userId = 1 AND chatId in (SELECT chatId FROM chats_users WHERE userId=3)
    //나간사람이. 채팅을 걸었을때.
    //
    //안나간 사람이 나간사람에게 채팅을 걸었을때.
    const { sender, receiver } = req.body;

    console.log(req.body);
    const isRoomExist = await sequelize.query(
      `SELECT COUNT(*) as exist, chatId FROM chats_users WHERE userId = ${sender} AND chatId in (SELECT chatId FROM chats_users WHERE userId=${receiver})`,
      { type: QueryTypes.SELECT },
    );

    console.log('1번째지나고');
    const isMessageExist = await sequelize.query(
      `SELECT COUNT(*) as exist, chatId FROM messages WHERE (sender = ${sender} AND receiver = ${receiver}) OR (receiver = ${sender} AND sender = ${receiver})`,
      { type: QueryTypes.SELECT },
    );
    if (!isRoomExist[0].exist && !isMessageExist[0].exist) {
      let room = await chat.create({}, { fields: [] });

      let roomlist = await chats_user.bulkCreate(
        [
          { chatId: room.id, userId: sender },
          { chatId: room.id, userId: receiver },
        ],
        { fields: ['chatId', 'userId'] },
      );
      res.status(201).json({ data: { roomId: room.id }, message: 'created!' });
    } else {
      res.status(200).json({ data: { roomId: isRoomExist[0].chatId || isMessageExist[0].chatId }, message: 'ok' });
    }
  },
  patch: async (req, res) => {
    const chatId = req.params.id;
    const userId = isAuthorized(req).id || false;
    if (userId) {
      await sequelize.query(
        `UPDATE chats_users SET updatedAt=CURRENT_TIMESTAMP
          WHERE chatId=${chatId} AND userId=${userId}
          `,
        { type: QueryTypes.UPDATE },
      );
      res.status(200).json({ message: 'ok' });
    }
  },
  delete: async (req, res) => {
    const userId = isAuthorized(req).id;
    console.log(userId);
    if (userId) {
      const chatId = req.params.id;
      await chats_user.destroy({ where: { userId, chatId } });
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
};
