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
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* margin-top: 2%; */
  position: fixed;
  left: 10%;
  top: 30%;
  margin: 0;

  @media ${(props) => props.theme.avatar} {
    position: static;
    flex-direction: row;
    width: 100%;
    height: 150px;
  }
`;

const TextStyle = styled(Link)`
  text-decoration-line: none;
  color: black;
  :hover {
    cursor: pointer;
  }
`;

const LogoutStyleRes = styled.span`
  display: none;
  :hover {
    cursor: pointer;
    color: #0d6efd;
  }
  @media ${(props) => props.theme.avatar} {
    display: inline-block;
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
      <div>
        <Avatar size={100} icon={<img src={profileImg} />} />
      </div>
      <div>{username}</div>
      <TextStyle to="/MyPage/UserEditPage">
        <div>EDIT</div>
      </TextStyle>
      <TextStyle to="/MyPage/MyPostPage">
        <div>My Question</div>
      </TextStyle>
      <LogoutStyleRes onClick={handleLogOut}>Logout</LogoutStyleRes>
    </ContainerStyle>
  );
}

export default AvatarCompo;
