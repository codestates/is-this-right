const { isAuthorized } = require('../tokenFunctions');
const { adviser, feedback, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
module.exports = {
  getTop10: async (req, res) => {
    const category = req.query.category;
    //Required column: adviser(id, name), user(profileImg), Count(selected feedback)
    const top10Info = await sequelize.query(
      `SELECT advisers.id, advisers.name, users.profileImg, IFNULL(selectedCount.count,0) as selectedCount
        FROM advisers 
        JOIN users ON advisers.userId = users.id
        LEFT JOIN (SELECT advisers.id, COUNT(*) as count 
          FROM posts 
          JOIN feedbacks ON posts.selected = feedbacks.id 
          JOIN advisers ON feedbacks.adviserId = advisers.id 
          WHERE posts.category=${category}
          GROUP BY advisers.id) selectedCount ON advisers.id = selectedCount.id
        ORDER BY selectedCount DESC LIMIT 10;
        `,
      { type: QueryTypes.SELECT },
    );
    res.status(200).json({ data: top10Info, message: 'ok' });
  },
  post: async (req, res) => {
    const userId = isAuthorized(req).id;
    const { postId, content } = req.body;
    const adviserInfo = await adviser.findOne({ where: { userId } });
    console.log(adviserInfo);
    if (!adviserInfo) {
      res.status(401).json({ message: 'Unauthorized request' });
    } else {
      const adviserId = adviserInfo.id;
      //INSERT INTO feedbacks table
      const created = await feedback.create({ postId, adviserId, content });
      res.status(201).json({ data: created, message: 'created' });
    }
  },
  put: async (req, res) => {
    const userId = isAuthorized(req).id;
    const feedbackId = Number(req.params.id);
    const adviserInfo = await adviser.findOne({ where: { userId } });
    const feedbackInfo = await feedback.findOne({ where: { id: feedbackId } });
    const { content } = req.body;

    // Update only when request user is same as author of the feedback
    if (!feedbackInfo) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      if (feedbackInfo.adviserId === adviserInfo.id) {
        await feedback.update({ content }, { where: { id: feedbackId } });
        res.status(200).json({ message: 'ok' });
      } else {
        res.status(401).json({ message: 'Unauthorized Request' });
      }
    }
  },
  delete: async (req, res) => {
    const userId = isAuthorized(req).id;
    const feedbackId = Number(req.params.id);
    const adviserInfo = await adviser.findOne({ where: { userId } });
    const feedbackInfo = await feedback.findOne({ where: { id: feedbackId } });

    // Update only when request user is same as author of the feedback
    if (!feedbackInfo) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      if (feedbackInfo.adviserId === adviserInfo.id) {
        await feedback.destroy({ where: { id: feedbackId } });
        res.status(200).json({ message: 'ok' });
      } else {
        res.status(401).json({ message: 'Unauthorized Request' });
      }
    }
  },
};
