import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { TeamOutlined, MessageOutlined, QuestionOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import axios from 'axios';
import { successLogIn, addUserInfo, successLogout } from '../actions/userActionIndex';
import { setViewChatlist, setIsChat, setMessages, changeRoom } from '../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const NavAreaStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background: linear-gradient(70deg, #6366f1, #1d4ed8, #2563eb); */
  background: linear-gradient(70deg, #00b4d8, #0096c7);
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  > .logo {
    width: 180px;
    height: 40px;
    background-size: cover;
    background-image: url('../../imageFile/Logo2.png');
    :hover {
      cursor: pointer;
      background-image: url('../../imageFile/Logo3.png');
      transition: 0.5s ease-in-out;
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
  font-size: 1.1rem;
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
      transition: 0.5s ease-in-out;
      color: #0077b6;
    }
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const MobileDivStyle = styled.div`
  display: none;
  @media ${(props) => props.theme.mobile} {
    font-size: 2rem;
    background: linear-gradient(70deg, #023e8a, #0077b6 90%);

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
  }
`;
const SpanStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
  &:hover .messageIcon > svg {
    color: #023e8a;
    transition: 0.5s;
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
    color: #023e8a;
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
            <SpanStyle>Mentors</SpanStyle>
          </LinkStyle>
        </div>
        <div>
          <LinkStyle to="/">
            <SpanStyle>Question</SpanStyle>
          </LinkStyle>
        </div>

        {state.logIn ? (
          <>
            <div>
              <LinkStyle to="/MyPage">
                <SpanStyle>Mypage</SpanStyle>
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
          <LinkStyle to="/AdviserList">
            <SpanStyle>
              <TeamOutlined />
            </SpanStyle>
          </LinkStyle>
        </div>
        <div>
          <LinkStyle to="/">
            <SpanStyle>
              <QuestionOutlined />
            </SpanStyle>
          </LinkStyle>
        </div>

        {state.logIn ? (
          <>
            <div>
              <LinkStyle to="/MyPage">
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
