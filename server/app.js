const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  },
});
const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

app.use(router);

let test = () => {
  console.log('채팅을 보낼때마다 데이터베이스에갑니다');
};

io.on('connection', (socket) => {
  // 클라와 채팅방과 연결
  socket.on('test', (data) => {
    console.log('received: "' + data + '" from client' + socket.id);
    socket.emit('test', 'Ok, i got it, ' + socket.id);
  });

  socket.on('join', (data) => {
    // 방입장할때 기존에 있던 방에서 나옴
    socket.leaveAll();
  });

  socket.on('sendMessage', (message, callback) => {
    // 메세지 날릴때
    socket.join(message.room);
    console.log('여기메세지떠야하는뎅', message);
    io.to(message.room).emit('message', { user: '상현', text: message.message });

    //callback(); 여기서 데이타베이스에 저장
  });

  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
  });
});
