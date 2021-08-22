import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {
  TeamOutlined,
  MessageOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
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
  background: #00baef;
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  > img {
    width: 150px;

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
  color: black;
  font-size: 15px;
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
      transition: 0.5s;
      color: #ffffff;
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
    background-color: #00baef;
    height: 15vh;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 998;
    margin-bottom: 0;
    list-style: none;
    & > :hover {
      transition: 0.5s;
      color: #ffffff;
    }
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
  :hover {
    cursor: pointer;
  }
`;

const LinkStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration-line: none;
  color: black;
  &:hover {
    color: #ffffff;
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
      <img onClick={handleClickHome} src="../../imageFile/Logo_black.png" alt="" />
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
                <MessageOutlined />
              </SpanStyle>
            </div>
          </>
        ) : (
          <div>
            <LinkStyle to="/SignIn">
              <SpanStyle>Login</SpanStyle>
            </LinkStyle>
          </div>
        )}
      </MobileDivStyle>
    </NavAreaStyle>
  );
}

export default Nav;
