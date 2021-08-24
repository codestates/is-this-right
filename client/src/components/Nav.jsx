import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TeamOutlined, MessageOutlined, QuestionOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import axios from 'axios';
import { successLogIn, addUserInfo, successLogout } from '../actions/userActionIndex';
import { setViewChatlist, setIsChat, setMessages, changeRoom } from '../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const NavAreaStyle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background: linear-gradient(70deg, #6366f1, #1d4ed8, #2563eb); */
  background: linear-gradient(60deg, #0096c7 40%, #0077b6);
  /* background: rgba(0, 119, 182, 0.8); */
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  > .logo {
    width: 120px;
    height: 25px;
    background-size: cover;
    background-image: url('../../imageFile/Logo2.png');
    :hover {
      cursor: pointer;
      width: 150px;
      height: 30px;
      transition: 0.2s ease-in-out;
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
  color: #fff;
  font-size: 1rem;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  height: 100%;
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
    font-size: 2rem;
    background: #023e8a;

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
      font-size: 2.5rem;
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
    font-size: 2.5rem;
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
    font-size: 2.5rem;
    transition: 0.2s;
  }
`;

function Nav() {
  // const [scroll, setScroll] = useState('');
  // const scrollRef = useRef()
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state.logIn, '로그인 상태입니다.');
  const location = useLocation();
  console.log('Path:', location.pathname);

  useEffect(async () => {
    let userInfo = await axios.get(`${url}/users`);
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
    <NavAreaStyle>
      {/* <ContainerStlye> */}
      {/* <img onClick={handleClickHome} src="../../imageFile/Logo2.png" alt="" /> */}
      <div onClick={handleClickHome} className="logo" />
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
                <SpanStyle className={location.pathname === '/MyPage' ? 'selected' : ''}>Mypage</SpanStyle>
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
