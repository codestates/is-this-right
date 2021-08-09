import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DividePage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
`;

const LoginSectionStyle = styled.div`
  flex: 0.88 1 0%;
  display: flex;
  flex-direction: column;
`;

const ImageStyle = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  flex: 1 1 0%;
  background-image: url(../../imageFile/signIn.jpg);
  background-size: 100% 100%;
`;

const HeadSectionStyle = styled.div`
  padding: 150px 24px 0px;
  margin: 0px auto;
  width: 100%;
  max-width: 376px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

function SignInPage() {
  const [emailValue, setEmailValue] = useState('');

  const handleEmailValue = (e) => {
    console.log(e.target.value);
    setEmailValue(e.target.value);
  };
  const handleLogIn = () => {};

  return (
    <DividePage>
      <LoginSectionStyle>
        <HeadSectionStyle>
          <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '120px' }} />
          <div style={{ fontSize: '22px' }}>로그인</div>
        </HeadSectionStyle>
        <div>
          <div>이메일</div>
          <input type="text" onChange={(e) => handleEmailValue(e)}></input>
          <div>비밀번호</div>
          <input type="text"></input>

          <div>회원 가입</div>
          <div> 로그인</div>
          <div>로셜</div>
          <div>로셜</div>
          <div>로셜</div>
        </div>
      </LoginSectionStyle>
      <ImageStyle />
    </DividePage>
  );
}

export default SignInPage;
