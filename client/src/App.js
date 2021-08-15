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
import { useSelector } from 'react-redux';
const url = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('text');
  const [isChat, setIsChat] = useState(false);
  const [roomNum, setRoomNum] = useState(null);
  const [currentSocket, setCurrentSocket] = useState(null);
  const [isList, setIsList] = useState(false);
  const [adviserList, setAdviserList] = useState([]);
  const handleClick = async () => {
    let result = await axios.get(`${url}/`);
    setText(result.data);
  };
  const state = useSelector((state) => state.userReducer);
  console.log(state);

  const createChatRoom = (userId) => {
    let payload = {
      sender: state.userInfo.data.id,
      receiver: userId,
    };
    //방만들고 룸넘버 획득
    if (state.logIn) {
      console.log(state.logIn, '인데 왜 여기로 들어옴');
      axios.post(`${url}/chats`, payload).then((data) => {
        console.log(data);
        setRoomNum(data.data.data.roomId);
        handleSetisChat();
      });
    }
  };
  const handleSetisChat = () => {
    setIsChat(true);
  };
  const changeRoom = (roomNum) => {
    setRoomNum(roomNum);
  };

  const showAdviserList = () => {
    setIsList(!isList);
  };
  useEffect(() => {
    if (state.logIn) setCurrentSocket(io(`${url}`));
  }, [state.logIn]);

  useEffect(() => {
    if (currentSocket) {
      //연결된 소켓이 있다면 online 채널에 접속.
      currentSocket.on('online', (result) => {
        console.log('연결성공');
      });
      currentSocket.emit('online', { data: 'test' });
    }
  }, [currentSocket]);

  useEffect(async () => {
    let list = await axios.get(`${url}/advisers`);
    setAdviserList(list.data);
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/">
          <button onClick={handleClick}>Get API</button>
          <div>{text} </div>
          <button onClick={() => showAdviserList()}>트레이너목록들</button>
          {isList
            ? adviserList.map((adviser) => {
                console.log(adviser);
                return (
                  <div key={adviser.id}>
                    <div>{adviser.name}입니다.</div>
                    <button onClick={() => createChatRoom(adviser.userId)}>채팅하러가기</button>
                  </div>
                );
              })
            : null}
          <div>
            <ChatRoom changeRoom={changeRoom} handleSetisChat={handleSetisChat}></ChatRoom>
            {isChat ? (
              <Chat
                roomNum={roomNum}
                name={state.userInfo.data.role === 'adviser' ? state.userInfo.data.name : state.userInfo.data.username}
                socket={currentSocket}
              />
            ) : null}
          </div>
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
