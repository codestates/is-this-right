const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');

module.exports = async (req, res) => {
  let userId = req.params.id;

  const postInfo = await sequelize
    .query(
      `SELECT posts.id, posts.title, posts.category, posts.createdAt, posts.updatedAt, IFNULL(posts.selected, 0) as selected, users.username, users.profileImg, IFNULL(fbCount.count,0) as feedbackCount
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
      return res.status(500).json({ message: 'database err' });
    });

  // let postInfo = await post
  //   .findAll({
  //     where: { userId },
  //     attributes: ['id', 'title', 'createdAt'],
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).json({ message: 'database err' });
  //   });

  res.json({ data: postInfo, message: 'ok' });
};
