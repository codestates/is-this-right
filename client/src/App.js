import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChatRoom from './components/chat/ChatRoom';
import Chat from './components/chat/Chat';
import io from 'socket.io-client';

import 'antd/dist/antd.css';

import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import MyPage from './pages/MyPage';
import QuestionListPage from './pages/QuestionListPage';
import SignInPage from './pages/SignInPage';
import UserSignUpPage from './pages/UserSignUpPage';
import AdvisorSignUpPage from './pages/AdvisorSignUpPage';
import QuestionPostPage from './pages/QuestionPostPage';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('text');
  const [isChat, setIsChat] = useState(false);
  const [roomNum, setRoomNum] = useState(null);
  const [userInfo, setUserInfo] = useState({ id: 1, username: '상현' });
  const [coach, setCoach] = useState({ id: 2, username: '강사' });
  const [currentSocket, setCurrentSocket] = useState(null);
  const [isList, setIsList] = useState(false);
  const [adviserList, setAdviserList] = useState([]);
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

  const createRoom = () => {
    setIsList(!isList);
  };
  useEffect(() => {
    //페이지 로드되었을때 소켓 접속.
    //! 로그인되어있을때만 소켓에 접속하게 바꾸기.
    setCurrentSocket(io(`${url}`));
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

  useEffect(async () => {
    let list = await axios.get(`${url}/advisers`);
    console.log('얘는뜨니?', list);
    setAdviserList(list.data);
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/">
          <button onClick={handleClick}>Get API</button>
          <div>{text} </div>
          <div>테스트 </div>
          <button onClick={() => createRoom()}>트레이너랑 채팅하러 가기</button>
          {isList
            ? adviserList.map((el) => {
                return (
                  <div key={el.id}>
                    <div>{el.name}입니다.</div>
                    <button onClick={() => changeRoom(el.id)}>클릭</button>
                  </div>
                );
              })
            : null}

          {isChat ? (
            <div>
              <ChatRoom chatClick={chatClick} userInfo={userInfo} changeRoom={changeRoom}></ChatRoom>
              {roomNum ? <Chat room={roomNum} name={userInfo.username} socket={currentSocket} /> : null}
            </div>
          ) : (
            <button onClick={chatClick}>채팅하러가기</button>
          )}
          <Nav />
          <QuestionListPage />
          <Footer />
        </Route>
        <Route path="/SignIn">
          <SignInPage />
        </Route>
        <Route path="/UserSignUp">
          <UserSignUpPage />
        </Route>
        <Route path="/AdvisorSignUp">
          <AdvisorSignUpPage />
        </Route>
        <Route path="/Mypage">
          <Nav />
          <MyPage />
          <Footer />
        </Route>
        <Route path="/QuestionPost">
          <Nav />
          <QuestionPostPage />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
