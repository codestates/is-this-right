import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TeamOutlined, MessageOutlined, QuestionOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import axios from 'axios';
import { successLogIn, addUserInfo, successLogout, handleLanding } from '../actions/userActionIndex';
import { setViewChatlist, setIsChat, setMessages, changeRoom } from '../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const NavAreaStyle = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* font-family: 'font-css'; */
  font-family: 'Open Sans', sans-serif;
  /* background: linear-gradient(70deg, #6366f1, #1d4ed8, #2563eb); */
  /* background: linear-gradient(180deg, #0096c7, #0077b6); */
  background: white;

  /* background: rgba(255, 255, 255, 0.7); */

  border-bottom: 1px solid rgba(222, 222, 222, 0.9);
  position: ${(props) => (props.landing === 'landing' ? 'fixed' : 'static')};
  top: ${(props) => (props.landing === 'landing' ? '0px' : '0px')};
  left: ${(props) => (props.landing === 'landing' ? '0' : '0')};
  z-index: 900;
  .logo {
    /* color: #fafafa; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 25px;
    background-size: cover;
    font-family: 'font-css';
    font-size: 1.6rem;
    /* background-image: url('../../imageFile/Logo2.png'); */

    .zero {
      font-size: 1.73rem;
    }
    .logo-rotate {
      display: inline-block;
      margin-left: -6px;
      font-size: 1.8rem;
      margin-bottom: -3px;
      transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
    }
    .logo-rotate-a {
      font-size: 1.6rem;
      margin-left: -6px;
      margin-bottom: -1px;
      display: inline-block;
      transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -webkit-transform: rotate(10deg);
      -o-transform: rotate(10deg);
    }
    :hover {
      cursor: pointer;
      width: 220px;
      height: 30px;
      font-size: 1.65rem;
      transition: 0.2s ease-in-out;
    }
    :hover .zero {
      cursor: pointer;
      font-size: 1.78rem;
      transition: 0.3s ease-in-out;
      transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -webkit-transform: rotate(10deg);
      -o-transform: rotate(10deg);
    }
    :hover .logo-rotate-a {
      cursor: pointer;
      font-size: 1.65rem;
      transition: 1.7s ease-in-out;
      transform: rotate(40deg);
      -moz-transform: rotate(40deg);
      -webkit-transform: rotate(40deg);
      -o-transform: rotate(40deg);
      margin-bottom: -10px;
    }
    :hover .logo-rotate {
      cursor: pointer;
      font-size: 1.85rem;
      transition: 2s ease-in-out;
      transform: rotate(430deg);
      -moz-transform: rotate(430deg);
      -webkit-transform: rotate(430deg);
      -o-transform: rotate(430deg);
      margin-bottom: -20px;
    }
  }
  > img {
    @media ${(props) => props.theme.mobile} {
      margin: 0 auto;
    }
  }
`;
const ContainerStlye = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

const DivStyle = styled.div`
  font-size: 1rem;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  gap: 20px;
  padding: 0;
  height: 100%;
  span {
    color: #000;
  }
  > div {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    min-height: 100%;
    & > :hover {
      font-weight: bold;
      font-size: 1.1rem;
      transition: 0.2s ease-in;
    }
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }

  .selected {
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

const MobileDivStyle = styled.div`
  display: none;
  @media ${(props) => props.theme.mobile} {
    font-size: 2.2rem;
    /* background: #023e8a; */
    background: #0077b6;
    height: 12vh;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 899;
    margin-bottom: 0;
    list-style: none;
    > div {
      width: 100%;
      height: 100%;
    }

    .selected {
      font-size: 2.8rem;
    }
  }
`;
const SpanStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
  &:hover .messageIcon > svg {
    font-size: 2.8rem;
    transition: 0.2s;
  }
`;

const LinkStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration-line: none;
  color: #fff;
  &:hover {
    font-size: 2.8rem;
    transition: 0.2s;
  }
`;

function Nav({ landing = 'normal' }) {
  // const [scroll, setScroll] = useState('');
  // const scrollRef = useRef()
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state.logIn, '로그인 상태입니다.');
  const location = useLocation();
  console.log('Path:', location.pathname);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    let userInfo = await axios.get(`${url}/users`).catch((el) => {
      console.log('잘변하니', state);
      if (state.guest) {
        window.location.replace('./landing');
      }
    });
    if (userInfo) {
      dispatch(successLogIn());
      dispatch(addUserInfo(userInfo.data.data));
    }

    // window.addEventListener('scroll', handleScroll);
  }, []);

  // const handleScroll = () => {
  //   if (window.pageYOffset > 0) {
  //     if (!scroll) {
  //       setScroll('black');
  //     }
  //   } else {
  //     if (scroll) {
  //       setScroll('#00baef');
  //     }
  //   }
  // };

  let handleClickHome = () => {
    history.push('/');
  };

  let handleLogOut = () => {
    axios.get(`${url}/signout`).then((ok) => {
      dispatch(successLogout());
      chatState.socket.emit('logout');
      window.location.replace('/');
    });
  };

  const handleChat = () => {
    dispatch(setIsChat(true));
    dispatch(setViewChatlist(true));
    chatState.socket.emit('quitRoom');
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
  };
  return (
    <NavAreaStyle landing={landing}>
      {/* <ContainerStlye> */}
      {/* <img onClick={handleClickHome} src="../../imageFile/Logo2.png" alt="" /> */}
      <div onClick={handleClickHome} className="logo">
        이거맞<span className="zero">0</span>
        <span className="logo-rotate-a">ㅏ</span>
        <span className="logo-rotate">?</span>
      </div>
      <DivStyle>
        <div>
          <LinkStyle to="/AdviserList">
            <SpanStyle className={location.pathname === '/AdviserList' ? 'selected' : ''}>Mentors</SpanStyle>
          </LinkStyle>
        </div>
        <div>
          <LinkStyle to="/">
            <SpanStyle className={location.pathname === '/' ? 'selected' : ''}>Question</SpanStyle>
          </LinkStyle>
        </div>

        {state.logIn ? (
          <>
            <div>
              <LinkStyle to="/MyPage">
                <SpanStyle className={location.pathname.includes('/MyPage') ? 'selected' : ''}>Mypage</SpanStyle>
              </LinkStyle>
            </div>
            <div>
              <SpanStyle onClick={handleLogOut}>Logout</SpanStyle>
            </div>
          </>
        ) : (
          <div>
            <LinkStyle to="/SignIn">
              <SpanStyle>Login</SpanStyle>
            </LinkStyle>
          </div>
        )}
      </DivStyle>
      {/* </ContainerStlye> */}
      <MobileDivStyle>
        <div>
          <LinkStyle to="/AdviserList" className={location.pathname === '/AdviserList' ? 'selected' : ''}>
            <SpanStyle>
              <TeamOutlined />
            </SpanStyle>
          </LinkStyle>
        </div>
        <div>
          <LinkStyle to="/" className={location.pathname === '/' ? 'selected' : ''}>
            <SpanStyle>
              <QuestionOutlined />
            </SpanStyle>
          </LinkStyle>
        </div>

        {state.logIn ? (
          <>
            <div>
              <LinkStyle to="/MyPage" className={location.pathname === '/MyPage' ? 'selected' : ''}>
                <SpanStyle>
                  {/* <Avatar size={32} src={<img src={state.userInfo.profileImg} />} /> */}
                  <UserOutlined />
                </SpanStyle>
              </LinkStyle>
            </div>
            <div>
              <SpanStyle onClick={handleChat}>
                <Badge count={chatState.newMessages}>
                  <MessageOutlined className="messageIcon" style={{ fontSize: '2rem', color: '#fff' }} />
                </Badge>
              </SpanStyle>
            </div>
          </>
        ) : (
          <div>
            <LinkStyle to="/SignIn">
              <SpanStyle>
                <LoginOutlined />
              </SpanStyle>
            </LinkStyle>
          </div>
        )}
      </MobileDivStyle>
    </NavAreaStyle>
  );
}

export default Nav;
