const { chats_user, message, sequelize } = require('../../models');
module.exports = {
  get: async (req, res) => {
    const userInfo = { id: 1 }; //isAuthorized(req);
    const chatId = 8; //Number(req.params.id);
    let list = await message.findAll({ where: { chatId } });

    let payload = list.map((el) => {
      return { text: el.message, user: el.sender };
    });

    res.status(200).send(payload);
    //이후 읽은 메세지 시간업데이트하기.
    await chats_user.update(
      { updatedAt: sequelize.fn('NOW') },
      {
        where: {
          chatId,
          userId: userInfo.id,
        },
      },
    );
  },
  post: (req, res) => {},
};
