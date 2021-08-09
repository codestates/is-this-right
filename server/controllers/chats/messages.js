const { user, message } = require('../../models');
module.exports = {
  get: async (req, res) => {
    let list = await message.findAll({ where: { chatId: 8 } });
    let payload = list.map((el) => {
      return { text: el.message, user: el.sender };
    });
    res.status(200).send(payload);
    //이후 읽은 메세지 시간업데이트하기 .
  },
  post: (req, res) => {},
};
