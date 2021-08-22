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
import {
  changeRoom,
  setSocket,
  updateChatList,
  setIsChat,
  setViewChatlist,
  addMessage,
  setNewMessages,
} from './actions/chatAction';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [isList, setIsList] = useState(false);
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  //멘토페이지에서 채팅하기 눌렀을때 필요한 친구.
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

  useEffect(() => {
    if (state.logIn) dispatch(setSocket(io(`${url}`)));
  }, [state.logIn]);

  useEffect(() => {
    if (chatState.socket) {
      //연결된 소켓이 있다면 online 채널에 접속.
      chatState.socket.on('online', async (message) => {
        console.log(message);
        let chatlist = await axios.get(`${url}/chats`);
        chatlist = chatlist.data.data;
        console.log('채팅', chatlist);
        dispatch(updateChatList(chatlist));
        dispatch(setNewMessages(chatlist.reduce((acc, cur) => acc + cur.unreadMessageCount, 0)));
      });
      chatState.socket.emit('online', state.userInfo);
    }
  }, [state.userInfo]);

  const markAsRead = async (chatId) => {
    return axios.patch(`${url}/chats/${chatId}`);
  };

  useEffect(() => {
    if (chatState.socket) {
      chatState.socket.on('message', async (message) => {
        if (!chatState.messages.filter((msg) => msg.id === message.id).length) {
          markAsRead(message.chatId).then(async () => {
            dispatch(addMessage(message));
            let chatlist = await axios.get(`${url}/chats`);
            chatlist = chatlist.data.data;
            dispatch(updateChatList(chatlist));
            dispatch(setNewMessages(chatlist.reduce((acc, cur) => acc + cur.unreadMessageCount, 0)));
          });
        }
      });
    }
  }, [chatState.socket]);

  return (
    <div className="App">
      {chatState.isChat ? <Chat /> : <Chatbutton />}
      <Switch>
        <Route exact={true} path="/">
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
