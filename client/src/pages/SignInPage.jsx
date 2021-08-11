import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { successLogIn } from '../actions/userActionIndex';

import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

const DividePage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
`;

const LoginSectionStyle = styled(Form)`
  flex: 0.88 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    flex: 1 1 0%;
  }
`;

const LogInStyle = styled.div`
  max-width: 376px;
  display: flex;
  /* width: 100%; */
  flex-direction: column;
`;

const ImageStyle = styled.div`
  flex: 1 1 0%;
  background-image: url(../../imageFile/signIn.jpg);
  background-size: 100% 100%;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const HeadSectionStyle = styled.div`
  padding: 150px 24px 0px;
  margin: 0px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const LabelStyle = styled.label`
  font-size: 16px;
`;

const ButtonStyle = styled(Button)`
  width: 100%;
  height: 40px;
  margin: 12px 0 12px;
`;

const SignUpStyle = styled.div`
  margin: 12px;
  color: rgb(114, 114, 114);
  display: flex;
  justify-content: space-between;
`;

const DivToSignUpStyle = styled.span`
  text-align: center;
  color: rgb(114, 114, 114);
  margin: 12px;
  :hover {
    color: blue;
  }
`;

function SignInPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    console.log(loginInfo);
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogIn = () => {
    if (!loginInfo.email || !loginInfo.password) {
      message.error('이메일과 비밀번호를 입력해주세요');

      return;
    }

    //axios연결 전까지 사용부분 - 삭제
    if (loginInfo.email === 'test' && loginInfo.password === 'test') {
      dispatch(successLogIn());
    } else {
      message.error('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
    }
    //axios연결해서 수정하기
    // axios.post(`${url}/signin`,{ email: loginInfo.email, password: loginInfo.password })
    // .then(result=>{
    //   dispatch(successLogIn());
    //   window.location.replace('/');
    // })
    // .catch(err=>{
    //   //에러메세지 넣어주기
    // setErrMessage('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
    // })
  };

  return (
    <DividePage>
      <LoginSectionStyle>
        <LogInStyle>
          <HeadSectionStyle>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </HeadSectionStyle>
          <div>
            <LabelStyle htmlFor="user-email">이메일</LabelStyle>
            <Input
              name="user-email"
              type="email"
              onChange={handleInputValue('email')}
              size="large"
              style={{ margin: '12px 0 6px 0' }}
              placeholder="이메일을 입력해주세요"
              required
            />

            <LabelStyle htmlFor="user-password">비밀번호</LabelStyle>
            <Input
              name="user-password"
              type="password"
              onChange={handleInputValue('password')}
              size="large"
              style={{ margin: '6px 0 0 0' }}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <SignUpStyle>
              회원 가입이 필요하신가요?
              <div>
                <Link to="/AdvisorSignUp">
                  <DivToSignUpStyle>강사</DivToSignUpStyle>
                </Link>
                <Link to="/UserSignUp">
                  <DivToSignUpStyle>유저</DivToSignUpStyle>
                </Link>
              </div>
            </SignUpStyle>
            <ButtonStyle onClick={handleLogIn}> 로그인</ButtonStyle>
            <ButtonStyle> 로셜</ButtonStyle>
            <ButtonStyle> 로셜</ButtonStyle>
            <ButtonStyle> 로셜</ButtonStyle>
          </div>
        </LogInStyle>
      </LoginSectionStyle>
      <ImageStyle />
    </DividePage>
  );
}

export default SignInPage;
