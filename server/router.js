const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

//users routing
router.get('/users', controllers.users.get);
router.put('/users', controllers.users.put);
router.post('/users/signin', controllers.signin);
router.get('/users/signout', controllers.signout);
router.post('/users/signup', controllers.signup);
router.post('/users/auth', controllers.auth);

//advisers routing
router.get('/advisers', controllers.advisers.get);
router.put('/advisers', controllers.advisers.put);
router.post('/advisers', controllers.advisers.post);

//feedbacks routing
router.get('/feedbacks/:id', controllers.feedbacks.get);
router.put('/feedbacks/:id', controllers.feedbacks.put);
router.post('/feedbacks', controllers.feedbacks.post);
router.delete('/feedbacks/:id', controllers.feedbacks.delete);

//posts routing
router.get('/posts', controllers.posts.get);
router.get('/posts/:id', controllers.posts.get);
router.put('/posts/:id', controllers.posts.put);
router.post('/posts', controllers.posts.post);
router.delete('/posts/:id', controllers.posts.delete);

//chats routing
router.get('/chats', controllers.chats.get);
router.post('/chats', controllers.chats.post);
router.get('/chats/messages', controllers.messages.get);
router.post('/chats/messages', controllers.messages.post);

router.get('/', (req, res) => {
  res.status(201).send('Welcome to 이거맞아? API Server!');
});
module.exports = router;
