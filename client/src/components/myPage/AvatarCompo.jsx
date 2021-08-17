import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContainerStyle = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 40%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function AvatarCompo() {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  let { username, profileImg } = userInfo;
  return (
    <ContainerStyle>
      <div>
        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<img src={profileImg} />} />,
      </div>

      <div>{username}</div>
      <Link to="/MyPage/UserEditPage">
        <div>EDIT</div>
      </Link>
      <Link to="/MyPage/MyPostPage">
        <div>내 질문</div>
      </Link>
    </ContainerStyle>
  );
}

export default AvatarCompo;
