import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { successLogout } from '../../actions/userActionIndex';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ContainerStyle = styled.div`
  flex: 1;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  left: 10vw;
  top: 15vh;
  padding: 20px;
  font-weight: bold;

  @media ${(props) => props.theme.avatar} {
    flex-direction: row;
    padding-left: 5vw;
    padding-right: 5vw;
    justify-content: space-around;
  }
  .name {
    font-family: 'font-css';
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    @media ${(props) => props.theme.avatar} {
      flex-direction: row;
      gap: 5px;
    }
  }
  .link {
    color: #000;
    :hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
  .logout {
    color: rgb(152, 0, 0);
    :hover {
      color: rgb(152, 0, 0, 0.7);
      transition: 0.1s;
      cursor: pointer;
    }
  }
  @media ${(props) => props.theme.avatar} {
    position: static;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 150px;
  }
`;

function AvatarCompo() {
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  let { username, profileImg } = userInfo;

  let handleLogOut = () => {
    axios.get(`${url}/signout`).then((ok) => {
      dispatch(successLogout());
      chatState.socket.emit('logout');
      window.location.replace('/');
    });
  };
  return (
    <ContainerStyle>
      <div className="header">
        <Avatar size={100} icon={<img src={profileImg} />} />
        <div className="name">{username}</div>
      </div>
      <Link className="link" to="/MyPage/UserEditPage" style={{ textDecorationLine: 'none' }}>
        <div className="edit">내정보</div>
      </Link>
      <Link className="link" to="/MyPage/MyPostPage" style={{ textDecorationLine: 'none' }}>
        <div className="list">내활동</div>
      </Link>
      <div className="logout" onClick={handleLogOut}>
        Logout
      </div>
    </ContainerStyle>
  );
}

export default AvatarCompo;
