const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
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
//const { addUser, removeUser} = require('./users');
const router = require('./router');
app.use(router);

// 클라와 소켓연결
io.on('connection', (socket) => {
  socket.on('online', (data) => {
    console.log('received: "' + data + '" from client' + socket.id);
    socket.emit('online', 'Ok, i got it, ' + socket.id);

    //여기서 addUser하기.
  });

  socket.on('join', (data) => {
    // 방입장할때 기존에 있던 방에서 나옴
    socket.leaveAll();
    socket.join(data.room);
  });

  socket.on('sendMessage', (message) => {
    // 메세지 받는곳.
    // 받은메세지를 해당 룸에 보내줌.
    console.log('여기메세지떠야하는뎅', message);
    io.to(message.room).emit('message', { user: '상현', text: message.message });

    //callback(); 여기서 데이타베이스에 메세지 저장 / 마지막읽은시간 업데이트.
  });
  // socket.on('newAlert'),
  //   (data) => {
  //     //data에 받는사람 아이디 .
  //     //io.to(data.userid).emit('newAlert',{message})
  //     //클라가 newAlert 을 받으면 새로운메세지 알림 띄우고 채팅방 목록을 새로요청해 렌더시키기
  //   };

  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
    //여기서 removeUser하기
  });
});
