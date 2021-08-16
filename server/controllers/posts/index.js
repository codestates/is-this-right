const { post, source, feedback, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const aws = require('aws-sdk');
const s3Config = require(__dirname + '/../../config/s3');
const s3 = new aws.S3(s3Config);
require('dotenv').config();
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  getAll: async (req, res) => {
    // Required column : posts(id, title,category,ca,ua,IFNULL(selected,false)), users(username, profileImg), feedbacks(피드백의 갯수)
    const postInfo = await sequelize.query(
      `SELECT posts.id, posts.title, posts.category, posts.createdAt, posts.updatedAt, IFNULL(posts.selected, 0) as selected, users.username, users.profileImg, IFNULL(fbCount.count,0) as feedbackCount
        FROM posts 
        JOIN users ON posts.userId = users.id
        LEFT JOIN (SELECT postId, COUNT(*) as count FROM feedbacks GROUP BY postId)fbCount ON posts.id = fbCount.postId
        ORDER BY posts.updatedAt DESC
        `,
      { type: QueryTypes.SELECT },
    );
    res.status(200).json({ data: postInfo, message: 'ok' });
  },

  getDetail: async (req, res) => {
    const id = Number(req.params.id);
    const postInfo = await sequelize.query(
      `SELECT posts.*, users.username, users.profileImg FROM posts JOIN users ON posts.userId = users.id WHERE posts.id = ${id}`,
      { type: QueryTypes.SELECT },
    );
    const sourceInfo = await source.findAll({ where: { postId: id }, attributes: ['sourceUrl', 'type'] });

    const feedbackInfo = await sequelize.query(
      `SELECT feedbacks.*, advisers.name, users.profileImg 
        FROM feedbacks 
        JOIN advisers ON feedbacks.adviserId = advisers.id 
        JOIN users ON advisers.userId = users.id
        WHERE feedbacks.postId = ${id}`,
      { type: QueryTypes.SELECT },
    );
    res.status(200).json({ data: { ...postInfo, sources: sourceInfo, feedbacks: feedbackInfo }, message: 'ok' });
  },

  post: async (req, res) => {
    //body title, category, content, userId
    //files postId, url
    const userId = isAuthorized(req).id;
    const { title, category, content } = req.body;
    const postCreated = await post.create({ userId, title, category, content });

    if (!!req.files.length) {
      const sourcesToInsert = req.files.map((file) => {
        return { postId: postCreated.id, sourceUrl: file.location, type: file.contentType.split('/')[0] };
      });
      console.log(sourcesToInsert);
      await source.bulkCreate(sourcesToInsert);
    }

    res.status(201).json({ message: 'created' });
  },

  put: async (req, res) => {
    const userId = isAuthorized(req).id;
    const postId = Number(req.params.id);
    const { title, category, content } = req.body;
    const postInfo = await post.findOne({ where: { id: postId } });
    if (userId === postInfo.userId) {
      //update posts table
      await post.update({ title, category, content }, { where: { id: postId } });
      //only if there's files to update
      if (!!req.files.length) {
        //delete old sources from s3
        const sourcesInfo = await source.findAll({ where: { postId } });

        sourcesInfo.forEach((source) => {
          const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: source.sourceUrl.slice(source.sourceUrl.indexOf('uploads')),
          };
          s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack);
            // an error occurred
            else console.log(params.Key, 'deleted!'); // successful response
          });
        });

        //delete old sources from sources table
        await source.destroy({ where: { postId } });

        //insert new soures to sources table
        const sourcesToInsert = req.files.map((file) => {
          return { postId, sourceUrl: file.location, type: file.contentType.split('/')[0] };
        });
        await source.bulkCreate(sourcesToInsert);
      }

      res.status(200).json({ message: 'ok' });
    } else {
      // if requested user is not the author of the post
      res.status(401).json({ message: 'Unauthorized Request' });
    }
  },

  delete: async (req, res) => {
    const userId = isAuthorized(req).id;
    const postId = Number(req.params.id);
    const postInfo = await post.findOne({ where: { id: postId } });

    if (userId === postInfo.userId) {
      //delete sources from s3
      const sourcesInfo = await source.findAll({ where: { postId } });

      sourcesInfo.forEach((source) => {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: source.sourceUrl.slice(source.sourceUrl.indexOf('uploads')),
        };
        s3.deleteObject(params, function (err, data) {
          if (err) console.log(err, err.stack);
          // an error occurred
          else console.log(params.Key, 'deleted!'); // successful response
        });
      });
      //delete post and sources from database
      post.destroy({ where: { id: postId } });
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized Request' });
    }
  },
};
