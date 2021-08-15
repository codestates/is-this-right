import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { successLogIn } from '../actions/userActionIndex';
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-naver-login';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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
    provider: 'origin',
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

    // axios연결해서 수정하기
    axios
      .post(`${url}/signin`, loginInfo)
      .then((result) => {
        window.location.replace('/');
      })
      .catch((err) => {
        //에러메세지 넣어주기
        message.error('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
      });
  };
  const handleEnterLogin = (e) => {
    if (e.keyCode === 13) handleLogIn();
  };

  let handleGoogleLogIn = (res) => {
    successSocial({ email: res.profileObj.email, provider: 'google' });
  };
  let handleNaverLogin = (res) => {
    successSocial({ email: res.email, provider: 'naver' });
  };
  let handleFail = (res) => {
    alert('해당 소셜사이트 인증에 실패했어요 ㅠㅠ');
  };
  let successSocial = (body) => {
    axios
      .post(`${url}/signin`, body)
      .then((data) => {
        if (data.data.message === 'signup plz') {
          alert('회원가입을해야합니다. 강사,유저 선택 모달창 나타나야한다ㅏㅏㅏ ');
          //소셜 회원가입 모달 선택창으로이동 !
        } else {
          console.log('로그인성공 ! ');
          window.location.replace('/');
        }
      })

      .catch((err) => console.log('우리 측 서버가 이상해요 ㅠㅠ '));
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
              onKeyUp={handleEnterLogin}
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
              onKeyUp={handleEnterLogin}
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
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_KEY}
              render={(props) => <ButtonStyle onClick={props.onClick}>google Login</ButtonStyle>}
              onSuccess={handleGoogleLogIn}
              onFailure={handleFail}></GoogleLogin>
            <NaverLogin
              clientId={process.env.REACT_APP_NAVER_API_KEY}
              callbackUrl={'http://localhost:3000/SignIn'}
              render={(props) => <ButtonStyle onClick={props.onClick}>Naver Login</ButtonStyle>}
              onSuccess={handleNaverLogin}
              onFailure={handleFail}
            />

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
