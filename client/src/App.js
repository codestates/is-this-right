import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from './components/chat/ChatList';
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
import UserQuestionPage from './pages/UserQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import AdvisorListPage from './pages/AdvisorListPage';
import AdvisorDetailPage from './pages/AdvisorDetailPage';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setSocket, updateChatList } from './actions/chatAction';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('text');
  const [isChat, setIsChat] = useState(false);
  const [isList, setIsList] = useState(false);
  const [adviserList, setAdviserList] = useState([]);
  const handleClick = async () => {
    let result = await axios.get(`${url}/`);
    setText(result.data);
  };
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const createChatRoom = (userId) => {
    //방만들고 룸넘버 획득
    if (state.logIn) {
      let payload = {
        sender: state.userInfo.data.id,
        receiver: userId,
      };
      axios.post(`${url}/chats`, payload).then((data) => {
        dispatch(changeRoom(data.data.data.roomId));
        chatState.socket.emit('join', { room: data.data.data.roomId });
        handleSetisChat();
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };
  const handleSetisChat = () => {
    setIsChat(true);
  };

  const showAdviserList = () => {
    setIsList(!isList);
  };
  useEffect(() => {
    if (state.logIn) dispatch(setSocket(io(`${url}`)));
  }, [state.logIn]);

  useEffect(() => {
    if (chatState.socket) {
      //연결된 소켓이 있다면 online 채널에 접속.
      chatState.socket.on('online', async (message) => {
        console.log(message);
        let chatlist = await axios.get(`${url}/chats`);
        dispatch(updateChatList(chatlist.data.data));
      });
      chatState.socket.emit('online', state.userInfo.data);
    }
  }, [chatState.socket]);

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
            <ChatList handleSetisChat={handleSetisChat} />
            {isChat ? <Chat /> : null}
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
        <Route path="/posts/:id">
          <Nav />
          <QuestionDetailPage />
          <Footer />
        </Route>
        <Route path="/AdviserList">
          <Nav />
          <AdvisorListPage />
          <Footer />
        </Route>
        <Route path="/advisers/:id">
          <Nav />
          <AdvisorDetailPage />
          <Footer />
        </Route>
        <Route path="/users/posts/:id">
          <Nav />
          <UserQuestionPage />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
