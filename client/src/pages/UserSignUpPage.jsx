import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, message } from 'antd';
const { Dragger } = Upload;
const url = process.env.REACT_APP_API_URL;

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
  max-width: 500px;
  display: flex;
  flex-direction: column;
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
  padding: 150px 150px 0px;
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

function UserSignUpPage() {
  const [profileImg, setProfileImg] = useState(null);
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImg: profileImg,
  });

  const onChangeUrl = (info) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);
      const response = info.file.response;
      const imageUrl = response.img;
      setProfileImg(imageUrl);
    }
  };

  const handleInputValue = (key) => (e) => {
    console.log(signUpInfo);
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const { username, email, password, confirmPassword, profileImg } = signUpInfo;
    const validateErr = checkValidation();
    // && !validateErr 유효성검사 넣어야함
    if (username && email && password && confirmPassword === password && !validateErr) {
      // axios
      //   .post(`${url}users/signup`, signUpInfo)
      //   .then((result) => {
      //     // setSuccessSignUp(true);
      window.location.replace('SignIn');
      // })
      // .catch((err) => {
      //   message.error('이미 가입된 중복된 정보가 있습니다. 확인 후 다시 시도 해주세요.');
      // });
    }
    // window.location.replace('SignIn'); // 삭제 해줘야함
  };

  const checkValidation = () => {
    const { email, password, username, confirmPassword } = signUpInfo;

    const emailRegularexpression = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordStr = password.search(/(?=.*\d)/g);
    const passwordSpe = password.search(/(?=.*[!@#$%^&+=])/gi);
    console.log(password);
    if (email === '') {
      message.error('이메일을 입력해주세요.');
      return false;
    } else if (!emailRegularexpression.test(email)) {
      message.error('이메일 형식이 맞지 않습니다.');
      return false;
    } else if (username === '') {
      message.error('닉네임을 입력해주세요.');
      return false;
    } else if (password === '') {
      message.error('비밀번호를 입력해주세요.');
      return false;
    } else if (password.search(/\s/g) !== -1) {
      message.error('공백이 포함되어있습니다.');
      return false;
    } else if (passwordStr < 0 || passwordSpe < 0) {
      message.error('영문, 숫자, 특수문자를 포함시켜주세요.');
      return false;
    } else if (password.length < 8 || password.length > 20) {
      message.error('비밀번호는 8자리 ~20자리입니다.');
      return false;
    } else if (password !== confirmPassword) {
      message.error('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      return true;
    }
  };

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
            <span>유저</span>
          </div>
          <div style={{ height: '150px', marginBottom: '32px' }}>
            <LabelStyle htmlFor="image">Profile image</LabelStyle>
            <Dragger
              name="image"
              // action={`${API_URL}/image`}
              listType="picture"
              showUploadList={false}
              onChange={onChangeUrl}>
              {profileImg ? (
                <img id="upload-img" src={`${url}/${profileImg}`} alt="" />
              ) : (
                <div>
                  <div>
                    <InboxOutlined />
                  </div>
                  <span>프로필 이미지를 업로드해주세요</span>
                </div>
              )}
            </Dragger>
          </div>
          <LabelStyle htmlFor="username">username</LabelStyle>
          <InputStyle
            name="username"
            type="text"
            onChange={handleInputValue('username')}
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle htmlFor="user-email">Email</LabelStyle>
          <InputStyle
            name="user-email"
            type="email"
            onChange={handleInputValue('email')}
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="이메일을 입력해주세요"
            required
          />
          <LabelStyle htmlFor="password">Password</LabelStyle>
          <Input.Password
            name="password"
            onChange={handleInputValue('password')}
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <LabelStyle htmlFor="confirmPassword">confirmPassword</LabelStyle>
          <Input.Password
            name="confirmPassword"
            onChange={handleInputValue('confirmPassword')}
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="입력했던 비밀번호를 다시 입력해주세요"
            required
          />
          <ButtonStyle type="primary" onClick={handleSignUp}>
            회원가입
          </ButtonStyle>
        </LogInStyle>
      </LoginSectionStyle>
    </DividePage>
  );
}

export default UserSignUpPage;
