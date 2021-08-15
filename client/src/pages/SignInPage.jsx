import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { successLogIn, addSignUpInfo } from '../actions/userActionIndex';
import { GoogleLogin } from 'react-google-login';
import NaverLogin from 'react-naver-login';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const socialPw = process.env.REACT_APP_SOCIAL_PW;
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

const ModalwindowStyle = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: all 0.3s;
  opacity: 1;
  pointer-events: auto;

  & > div {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    padding: 2em;
    background: white;
    border: 1px solid black;
    text-align: center;
  }
  h1 {
    font-size: 130%;
    margin: 0 0 15px;
  }
`;

const ModalCloseStyle = styled.div`
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

function SignInPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    provider: 'origin',
  });
  const [isSocialSignUp, setIsSocialSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.useReducer);
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
    dispatch(addSignUpInfo({ email: res.profileObj.email, provider: 'google' }));
    successSocial({ email: res.profileObj.email, password: socialPw, provider: 'google' });
  };
  let handleNaverLogin = (res) => {
    dispatch(addSignUpInfo({ email: res.email, provider: 'naver' }));
    successSocial({ email: res.email, password: socialPw, provider: 'naver' });
  };
  let handleFail = (res) => {
    alert('해당 소셜사이트 인증에 실패했어요 ㅠㅠ');
  };
  let handleSocialSignup = () => {
    setIsSocialSignUp(!isSocialSignUp);
  };
  let successSocial = (body) => {
    axios
      .post(`${url}/signin`, body)
      .then((data) => {
        if (data.data.message === 'signup plz') {
          handleSocialSignup();
          //소셜 회원가입 모달 선택창으로이동 !
        } else {
          console.log('로그인성공 ! ');
          window.location.replace('/');
        }
      })
      .catch((err) => console.log(err.response));
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
      {isSocialSignUp ? (
        <ModalwindowStyle>
          <div>
            <ModalCloseStyle onClick={handleSocialSignup}>close</ModalCloseStyle>
            <h1>회원가입 종류를 선택해주세요</h1>
            <Link to="/AdvisorSignUp/Social">
              <button>강사</button>
            </Link>
            <Link to="/UserSignUp/Social">
              <button style={{ marginLeft: '40px' }}>유저</button>
            </Link>
          </div>
        </ModalwindowStyle>
      ) : null}
    </DividePage>
  );
}

export default SignInPage;
