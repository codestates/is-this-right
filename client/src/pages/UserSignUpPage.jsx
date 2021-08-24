import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { Form, Input, Button } from 'antd';
import UploadCompo from '../components/UploadCompo';
const url = process.env.REACT_APP_API_URL;
const socialPw = process.env.REACT_APP_SOCIAL_PW;
axios.defaults.withCredentials = true;

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
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    flex: 1 1 0%;
  }
`;

const LogInStyle = styled(Form)`
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const ImageStyle = styled.div`
  flex: 1 1 0%;
  background-image: url(../../imageFile/signUp1.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const HeadSectionStyle = styled.div`
  /* padding: 30% 150px 0px; */
  margin: 0px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
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

const HideInputStyle = styled.div`
  margin: 0px;
`;

function UserSignUpPage() {
  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [signupErr, setSignupErr] = useState(null);

  const [disable, setDisable] = useState(true);

  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    provider: 'origin',
  });

  const state = useSelector((state) => state.userReducer);
  const socialHide = useRef(null);
  const history = useHistory();
  const handleInputValue = (key, e) => {
    console.log(signUpInfo);
    setSignUpInfo((signUpInfo) => ({ ...signUpInfo, [key]: e.target.value }));
  };

  const handleSignUp = () => {
    const { username, email, password, confirmPassword, provider } = signUpInfo;
    const profileImg = state.userProfileImg.imaFile;
    const formData = new FormData();
    formData.append('profileImg', profileImg);
    for (let key in signUpInfo) {
      formData.append(key, signUpInfo[key]);
    }
    if (username && email && password && confirmPassword === password) {
      axios
        .post(`${url}/signup`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          // setSuccessSignUp(true);
          console.log(result);
          alert('회원가입이 완료되었습니다');
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
          setSignupErr('잘못된 정보가 있습니다. 확인 후 다시 시도 해주세요.');
        });
    }
  };

  const checkValidation = (name, e) => {
    const { email, password, username, confirmPassword } = signUpInfo;

    const emailRegularexpression = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordStr = password.search(/(?=.*\d)/g);
    const passwordSpe = password.search(/(?=.*[!@#$%^&+=])/gi);
    if (name === 'email') {
      if (email === '') {
        setEmailErr('이메일을 입력해주세요.');
        return false;
      } else if (!emailRegularexpression.test(email)) {
        setEmailErr('이메일 형식이 맞지 않습니다.');
        return false;
      } else {
        axios
          .get(`${url}/users/?email=${email}`)
          .then((ok) => {
            setEmailErr('');
            return true;
          })
          .catch((err) => {
            setEmailErr('중복된 이메일이 있습니다.');
            return false;
          });
      }
    }
    if (name === 'username') {
      if (username === '') {
        setUsernameErr('닉네임을 입력해주세요.');
        return false;
      } else {
        axios
          .get(`${url}/users/?username=${username}`)
          .then((ok) => {
            setUsernameErr('');
            return true;
          })
          .catch((err) => {
            setUsernameErr('중복된 닉네임이 있습니다.');
            return false;
          });
      }
    }
    if (name === 'password') {
      if (password === '') {
        setPasswordErr('비밀번호를 입력해주세요.');

        return false;
      } else if (password.search(/\s/g) !== -1) {
        setPasswordErr((passwordErr) => '공백이 포함되어있습니다.');
        return false;
      } else if (passwordStr < 0 || passwordSpe < 0) {
        setPasswordErr((passwordErr) => '영문, 숫자, 특수문자를 포함시켜주세요.');
        return false;
      } else if (password.length < 8 || password.length > 20) {
        setPasswordErr((passwordErr) => '비밀번호는 8자리 ~20자리입니다.');
        return false;
      } else {
        setPasswordErr('');
        return true;
      }
    }

    if (name === 'confirm') {
      if (password !== confirmPassword && confirmPassword !== '') {
        setConfirmPasswordErr('비밀번호가 일치하지 않습니다.');
        return false;
      } else {
        setConfirmPasswordErr('');
        return true;
      }
    }
    return true;
  };

  useEffect(() => {
    console.log(signUpInfo);
    let isDisabled = true;
    for (let key in signUpInfo) {
      isDisabled = isDisabled && signUpInfo[key] !== '' && signUpInfo['password'] === signUpInfo['confirmPassword'];
    }
    setDisable(!isDisabled);
  }, [signUpInfo]);
  useEffect(() => {
    setSignupErr('');
    checkValidation('confirm');
  }, [signUpInfo]);

  useEffect(() => {
    let Url = new URL(window.location.href).pathname;
    if (Url.includes('Social')) {
      socialHide.current.style.display = 'none';
      setSignUpInfo({ ...signUpInfo, ...state.signUpInfo, password: socialPw, confirmPassword: socialPw });
    }
  }, []);

  return (
    <DividePage>
      <ImageStyle />
      <LoginSectionStyle>
        <LogInStyle>
          <HeadSectionStyle>
            <img src="../../imageFile/Logo_black.png" alt="" style={{ width: '200px' }} />
          </HeadSectionStyle>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '28px' }}>
            회원가입
            <span>User</span>
          </div>
          <UploadCompo where="user" />

          <LabelStyle htmlFor="username">username</LabelStyle>
          <InputStyle
            name="username"
            type="text"
            onChange={(e) => handleInputValue('username', e)}
            onBlur={() => checkValidation('username')}
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {usernameErr ? <div>{usernameErr}</div> : null}
          <HideInputStyle ref={socialHide}>
            <LabelStyle htmlFor="user-email">Email</LabelStyle>
            <InputStyle
              name="user-email"
              type="email"
              onChange={(e) => handleInputValue('email', e)}
              onBlur={() => checkValidation('email')}
              size="large"
              style={{ margin: '12px 0 6px 0' }}
              placeholder="이메일을 입력해주세요"
              required
            />
            {emailErr ? <div>{emailErr}</div> : null}
            <LabelStyle htmlFor="password">Password</LabelStyle>
            <Input.Password
              name="password"
              onChange={(e) => handleInputValue('password', e)}
              onBlur={() => checkValidation('password')}
              size="large"
              style={{ margin: '12px 0 6px 0' }}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            {passwordErr ? <div>{passwordErr}</div> : null}

            <LabelStyle htmlFor="confirmPassword">ConfirmPassword</LabelStyle>
            <Input.Password
              name="confirmPassword"
              onChange={(e) => {
                handleInputValue('confirmPassword', e);
              }}
              size="large"
              style={{ margin: '12px 0 6px 0' }}
              placeholder="입력했던 비밀번호를 다시 입력해주세요"
              required
            />
            {confirmPasswordErr ? <div>{confirmPasswordErr}</div> : null}
          </HideInputStyle>
          {signupErr ? <div>{signupErr}</div> : null}
          <ButtonStyle type="primary" onClick={handleSignUp} disabled={disable}>
            회원가입
          </ButtonStyle>
        </LogInStyle>
      </LoginSectionStyle>
    </DividePage>
  );
}

export default UserSignUpPage;
