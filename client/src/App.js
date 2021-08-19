import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './components/chat/Chat';
import Chatbutton from './components/chat/Chatbutton';
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
import { changeRoom, setSocket, updateChatList, setIsChat, setViewChatlist, addMessage } from './actions/chatAction';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [text, setText] = useState('text');
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
        sender: state.userInfo.id,
        receiver: userId,
      };
      axios.post(`${url}/chats`, payload).then((data) => {
        dispatch(changeRoom(data.data.data.roomId));
        chatState.socket.emit('join', { room: data.data.data.roomId });
        dispatch(setIsChat(true));
        dispatch(setViewChatlist(false));
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
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
      chatState.socket.emit('online', state.userInfo);
      console.log('소켓아이디가 변하고있니?', chatState.socket);
    }
  }, [chatState.socket]);

  const markAsRead = async (chatId) => {
    return axios.patch(`${url}/chats/${chatId}`);
  };
  let count = 0;
  useEffect(() => {
    if (chatState.socket) {
      chatState.socket.on('message', async (message) => {
        console.log(message, '여기가 여러번 불러지고있거든?');
        console.log(++count);
        if (!chatState.messages.filter((msg) => msg.id === message.id).length) {
          markAsRead(message.chatId).then(async () => {
            dispatch(addMessage(message));
            let chatlist = await axios.get(`${url}/chats`);
            dispatch(updateChatList(chatlist.data.data));
          });
        }
      });
      console.log('여기는 chatList.jsx, socket이 바뀌나?', chatState.socket.id);
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
          <div></div>
          {chatState.isChat ? <Chat /> : <Chatbutton />}
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
