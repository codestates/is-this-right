const { post } = require('../../models');

module.exports = async (req, res) => {
  let userId = req.params.id;
  let postInfo = await post
    .findAll({
      where: { userId },
      attributes: ['id', 'title', 'createdAt'],
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'database err' });
    });
  res.json({ data: postInfo, message: 'ok' });
};
