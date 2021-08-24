const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const port = process.env.PORT || 80;
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    // origin: ['http://localhost:3000', 'http://localhost:3001', 'https://isthisright.ml'],
    origin: true,
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: ['http://localhost:3000', 'http://localhost:3001', 'https://isthisright.ml'],
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);
app.use(router);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

require('./socket')(io);
