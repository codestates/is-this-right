const { chats_user, message, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  get: async (req, res) => {
    //유저 프로필 이미지 << 유저이름(or 어드바이저면 이름), 메세지.*
    //Required column: messages.*, users.profileImg, users.username (or adviser.name)
    const userInfo = isAuthorized(req);
    const chatId = req.params.id;
    if (userInfo) {
      const messageList = await sequelize.query(
        `SELECT messages.*, IFNULL(advisers.name, users.username) as username, users.profileImg
          FROM messages
          JOIN users ON messages.sender = users.id
          LEFT JOIN advisers ON users.id = advisers.userId
          WHERE messages.chatId=${chatId}
          ORDER BY createdAt
          `,
        { type: QueryTypes.SELECT },
      );

      //이후 읽은 메세지 시간업데이트하기.
      // await chats_user.update(
      //   { updatedAt: sequelize.fn('NOW') },
      //   {
      //     where: {
      //       chatId,
      //       userId: userInfo.id,
      //     },
      //   },
      // );
      await sequelize.query(
        `UPDATE chats_users SET updatedAt=CURRENT_TIMESTAMP
          WHERE chatId=${chatId} AND userId=${userInfo.id}
          `,
        { type: QueryTypes.UPDATE },
      );

      console.log(messageList);
      res.status(200).json({ data: messageList, message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
  post: async (req, res) => {
    //chatId, sender, receiver, message
    const userId = isAuthorized(req).id;
    const { chatId, sender, receiver } = req.body;
    if (userId === sender) {
      await chats_user.findOrCreate({ where: { chatId, userId: sender } });
      await chats_user.findOrCreate({ where: { chatId, userId: receiver } });
      const created = await message.create({ chatId, sender, receiver, message: req.body.message });
      res.status(201).json({ data: created, message: 'created!' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
};
