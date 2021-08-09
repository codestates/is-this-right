import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChatRoom from './components/chat/ChatRoom';
import Chat from './components/chat/Chat';
import io from 'socket.io-client';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('text');
  const [isChat, setIsChat] = useState(false);
  const [roomNum, setRoomNum] = useState(null);
  const [userInfo, setUserInfo] = useState({ id: 1, username: '상현' });
  const [coach, setCoach] = useState({ id: 2, username: '강사' });
  const [currentSocket, setCurrentSocket] = useState(null);

  const handleClick = async () => {
    let result = await axios.get(`${url}/`);
    setText(result.data);
  };
  const chatClick = () => {
    setIsChat(!isChat);
  };

  const changeRoom = (roomNum) => {
    setRoomNum(roomNum);
  };
  const createRoom = async (userInfo, coach) => {
    let body = { user1: userInfo, user2: coach };
    let room = await axios.post('http://localhost:80/chats', body);
  };

  useEffect(() => {
    //페이지 로드되었을때 소켓 접속.
    //! 로그인되어있을때만 소켓에 접속하게 바꾸기.
    setCurrentSocket(io('http://localhost:80'));
  }, []);

  useEffect(() => {
    if (currentSocket) {
      //연결된 소켓이 있다면 online 채널에 접속.
      currentSocket.on('online', (result) => {
        console.log(result);
        console.log('연결좀되라 ㅡㅡ ');
      });
      currentSocket.emit('online', { data: 'test' });
    }
  }, [currentSocket]);

  return (
    <div className="App">
      <button onClick={handleClick}>Get API</button>
      <div>{text} </div>
      <div>테스트 </div>
      <button onClick={() => createRoom(userInfo, coach)}>트레이너랑 채팅하러 가기</button>
      {isChat ? (
        <div>
          <ChatRoom chatClick={chatClick} userInfo={userInfo} changeRoom={changeRoom}></ChatRoom>
          {roomNum ? <Chat room={roomNum} name={userInfo.username} socket={currentSocket} /> : null}
        </div>
      ) : (
        <button onClick={chatClick}>채팅하러가기</button>
      )}
    </div>
  );
}

export default App;
