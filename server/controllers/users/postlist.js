const { sequelize, adviser } = require('../../models');
const { QueryTypes } = require('sequelize');

module.exports = async (req, res) => {
  let userId = req.params.id;
  const response = {};
  const postInfo = await sequelize
    .query(
      `SELECT posts.id, posts.title, posts.content, posts.category, posts.createdAt, posts.updatedAt, IFNULL(posts.selected, 0) as selected, users.username, users.profileImg, IFNULL(fbCount.count,0) as feedbackCount
      FROM posts 
      JOIN users ON posts.userId = users.id
      LEFT JOIN (SELECT postId, COUNT(*) as count FROM feedbacks GROUP BY postId)fbCount ON posts.id = fbCount.postId
      WHERE posts.userId=${userId}
      ORDER BY posts.updatedAt DESC
      `,
      { type: QueryTypes.SELECT },
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'database err' });
    });
  response.postInfo = postInfo;
  const isAdviser = await adviser.count({ where: { userId } });
  if (isAdviser) {
    //feedbacks (postId, content, createdAt), posts (title, selected),
    const feedbackInfo = await sequelize
      .query(
        `SELECT feedbacks.id, feedbacks.postId, feedbacks.content, feedbacks.createdAt, posts.title, posts.category, IFNULL(posts.selected, 0) as selected, users.username, users.profileImg
      FROM advisers
      JOIN feedbacks ON advisers.id = feedbacks.adviserId
      JOIN posts ON posts.id = feedbacks.postId
      JOIN users ON posts.userId = users.id
      WHERE advisers.userId=${userId}
      ORDER BY feedbacks.createdAt DESC
      `,
        { type: QueryTypes.SELECT },
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'database err' });
      });
    response.feedbackInfo = feedbackInfo;
  }

  res.json({ data: response, message: 'ok' });
};
