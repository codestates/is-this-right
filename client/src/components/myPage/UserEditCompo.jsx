import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import UploadCompo from '../UploadCompo';
const { Option } = Select;

const UserPostListCompoStyle = styled.div`
  width: 100%;
  height: 85%;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelStyle = styled.label`
  font-size: 20px;
`;

const InputStyle = styled(Input)`
  margin-top: 6px;
  margin-bottom: 12px;
`;

const ButtonStyle = styled(Button)`
  margin-top: 20px;
  height: 50px;
`;

function UserEditCompo() {
  return (
    <UserPostListCompoStyle>
      <UploadCompo where="user" />
      <LabelStyle htmlFor="username">username</LabelStyle>
      <InputStyle
        name="username"
        type="text"
        size="large"
        defaultValue="김코딩" //프롭스 들어갈 위치
        style={{ margin: '12px 0 6px 0' }}
        placeholder="닉네임을 입력해주세요"
        required
      />
      <LabelStyle htmlFor="user-email">Email</LabelStyle>
      <InputStyle
        name="user-email"
        type="email"
        size="large"
        defaultValue="김코딩@naver.com" //프롭스 들어갈 위치
        style={{ margin: '12px 0 6px 0' }}
        placeholder="이메일을 입력해주세요"
        required
      />
      <LabelStyle htmlFor="password">Password</LabelStyle>
      <Input.Password
        name="password"
        size="large"
        defaultValue="김코딩12!@" //프롭스 들어갈 위치
        style={{ margin: '12px 0 6px 0' }}
        placeholder="비밀번호를 입력해주세요"
        required
      />

      <LabelStyle htmlFor="confirmPassword">confirmPassword</LabelStyle>
      <Input.Password
        name="confirmPassword"
        size="large"
        style={{ margin: '12px 0 6px 0' }}
        defaultValue="김코딩12!@" //프롭스 들어갈 위치
        placeholder="입력했던 비밀번호를 다시 입력해주세요"
        required
      />
      <ButtonStyle type="primary">수정하기</ButtonStyle>
    </UserPostListCompoStyle>
  );
}

export default UserEditCompo;
