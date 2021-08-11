const express = require('express');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const controllers = require('./controllers');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Config = require(__dirname + '/config/s3');
const s3 = new aws.S3(s3Config);
const uuid = require('uuid');
const { ConnectContactLens } = require('aws-sdk');
require('dotenv').config();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${uuid.v4()}`);
    },
  }),
});

//users routing
router.get('/users', controllers.users.get);
router.put('/users', upload.single('profileImg'), controllers.users.put);
router.get('/users/posts/:id', controllers.postlist);
router.post('/signin', controllers.signin);
router.get('/signout', controllers.signout);
router.post('/signup', upload.single('profileImg'), controllers.signup);
router.post('/auth', controllers.auth);

//advisers routing
router.get('/advisers', controllers.advisers.get);
router.put('/advisers', controllers.advisers.put);
router.post('/advisers', upload.array('files'), controllers.advisers.post);
router.get('/advisers/:id', controllers.advisers.getDetail);

//feedbacks routing
router.put('/feedbacks/:id', controllers.feedbacks.put);
router.post('/feedbacks', controllers.feedbacks.post);
router.delete('/feedbacks/:id', controllers.feedbacks.delete);

//posts routing
router.get('/posts', controllers.posts.getAll);
router.get('/posts/:id', controllers.posts.getDetail);
router.put('/posts/:id', upload.array('files'), controllers.posts.put);
router.post('/posts', upload.array('files'), controllers.posts.post);
router.delete('/posts/:id', controllers.posts.delete);

//chats routing
router.get('/chats', controllers.chats.get);
router.post('/chats', controllers.chats.post);
router.get('/chats/messages/:id', controllers.messages.get);
router.post('/chats/messages', controllers.messages.post);

router.get('/', (req, res) => {
  res.status(201).send('Welcome to 이거맞아? API Server!');
});
module.exports = router;
