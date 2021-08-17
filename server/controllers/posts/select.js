const { post, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId, feedbackId } = req.body;
    const postInfo = await post.findOne({ where: { id: postId }, attributes: ['id', 'selected', 'userId'] });
    if (userInfo && userInfo.id === postInfo.dataValues.userId) {
      await sequelize.query(`UPDATE posts SET selected=${feedbackId} WHERE id=${postId}`, { type: QueryTypes.UPDATE });
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
  delete: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId } = req.body;
    const postInfo = await post.findOne({ where: { id: postId }, attributes: ['id', 'selected', 'userId'] });
    if (userInfo && userInfo.id === postInfo.dataValues.userId) {
      await sequelize.query(`UPDATE posts SET selected=null WHERE id=${postId}`, { type: QueryTypes.UPDATE });
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
};
