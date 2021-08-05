const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
const port = 80;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use(cookieParser());

//users routing
app.get('/users', controllers.users.get);
app.put('/users', controllers.users.put);
app.post('/users/signin', controllers.signin);
app.get('/users/signout', controllers.signout);
app.post('/users/signup', controllers.signup);
app.post('/users/auth', controllers.auth);

//advisers routing
app.get('/advisers', controllers.advisers.get);
app.put('/advisers', controllers.advisers.put);
app.post('/advisers', controllers.advisers.post);

//feedbacks routing
app.get('/feedbacks/:id', controllers.feedbacks.get);
app.put('/feedbacks/:id', controllers.feedbacks.put);
app.post('/feedbacks', controllers.feedbacks.post);
app.delete('/feedbacks/:id', controllers.feedbacks.delete);

//posts routing
app.get('/posts', controllers.posts.get);
app.get('/posts/:id', controllers.posts.get);
app.put('/posts/:id', controllers.posts.put);
app.post('/posts', controllers.posts.post);
app.delete('/posts/:id', controllers.posts.delete);

//chats routing
app.get('/chats', controllers.chats.get);
app.post('/chats', controllers.chats.post);
app.get('/chats/messages', controllers.chats.get);
app.post('/chats/messages', controllers.chats.post);

app.get('/', (req, res) => {
  res.status(201).send('Welcome to 이거맞아? API Server!');
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
