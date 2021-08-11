const { isAuthorized } = require('../tokenFunctions');
const { adviser, feedback } = require('../../models');
module.exports = {
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
