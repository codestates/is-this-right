import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import UploadCompo from '../components/UploadCompo';
import { Input, Button, Radio, Select } from 'antd';
import SelectBox from '../components/adviser/SelectBox';
import { useSelector } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_API_URL;

const AdvisorSignupPageStyle = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const ContainerStlye = styled.div`
  width: 60%;
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderLogoStyle = styled.div`
  background-color: #3957d1;
  width: 600px;
  height: 200px;
  padding: 20px;
  margin: 12px 12px 0;
`;

const InputAreaStyle = styled.div`
  width: 600px;
  margin: 12px;
  padding: 20px;
`;

const ButtonStyle = styled(Button)`
  margin-top: 20px;
  height: 50px;
  width: 100%;
`;

const LabelStyle = styled.label`
  font-size: 20px;
`;

function AdvisorSignUpPage() {
  const [profileErr, setProfileErr] = useState('');
  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [nameErr, setNameErr] = useState(null);
  const [genderErr, setGender] = useState(null);
  const [stateErr, setStateErr] = useState(null);
  const [categoryErr, setCategory] = useState(null);
  const [detailErr, setDetailErr] = useState(null);
  const [urlErr, setUrlErr] = useState(null);
  const [disable, setDisable] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    category: '',
    detail: '',
    url: '',
    gender: '',
    state: '',
  });
  const adviserPriviewState = useSelector((state) => state.adviserReducer.adviserProfileImg);
  const history = useHistory();

  const handleInputValue = (key, e) => {
    console.log(key);

    console.log(e);
    if (key === 'state') {
      setSignUpInfo({ ...signUpInfo, [key]: e });
    } else if (key === 'category') {
      setSignUpInfo({ ...signUpInfo, [key]: e });
    } else {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    }
  };

  const handleSignUp = () => {
    // && !validateErr 유효성검사 넣어야함
    const adviserImg = adviserPriviewState.imgFile;
    const formData = new FormData();
    formData.append('files', adviserImg);
    formData.append('provider', 'origin');
    // for (let el of adviserImg) {
    //   formData.append('files', el);
    // }
    for (let key in signUpInfo) {
      formData.append(key, signUpInfo[key]);
    }
    console.log(signUpInfo);
    if (Object.values(signUpInfo).length === 10) {
      axios
        .post(`${url}/advisers`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          alert('회원가입이 완료되었습니다.');
          window.location.replace('SignIn');
        })
        .catch((err) => {
          setUsernameErr('이미 가입된 중복된 정보가 있습니다. 확인 후 다시 시도 해주세요.');
        });
    }
    // window.location.replace('SignIn'); // 삭제 해줘야함
  };

  const checkValidation = (funcName) => {
    const { email, password, username, confirmPassword, name, category, detail, url, gender, state } = signUpInfo;

    const emailRegularexpression = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const nameRegularexpression = /^[가-힣]+$/;
    const urlRegularexpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    const passwordStr = password.search(/(?=.*\d)/g);
    const passwordSpe = password.search(/(?=.*[!@#$%^&+=])/gi);
    if (funcName === 'email') {
      if (email === '') {
        setEmailErr('이메일을 입력해주세요.');
        return false;
      } else if (!emailRegularexpression.test(email)) {
        setEmailErr('이메일 형식이 맞지 않습니다.');
        return false;
      } else {
        axios
          .get(`${process.env.REACT_APP_API_URL}/users/?email=${email}`)
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
    if (funcName === 'username') {
      if (username === '') {
        setUsernameErr('닉네임을 입력해주세요.');
        return false;
      } else {
        axios
          .get(`${process.env.REACT_APP_API_URL}/users/?username=${username}`)
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
    if (funcName === 'password') {
      if (password === '') {
        setPasswordErr('비밀번호를 입력해주세요.');
        return false;
      } else if (password.search(/\s/g) !== -1) {
        setPasswordErr('공백이 포함되어있습니다.');
        return false;
      } else if (passwordStr < 0 || passwordSpe < 0) {
        setPasswordErr('영문, 숫자, 특수문자를 포함시켜주세요.');
        return false;
      } else if (password.length < 8 || password.length > 20) {
        setPasswordErr('비밀번호는 8자리 ~20자리입니다.');
        return false;
      } else {
        setPasswordErr('');
        return true;
      }
    }
    if (funcName === 'confirm') {
      if (password !== confirmPassword && confirmPassword !== '') {
        setConfirmPasswordErr('비밀번호가 일치하지 않습니다.');
        return false;
      } else {
        setConfirmPasswordErr('');
        return true;
      }
    }
    if (funcName === 'profileImg') {
      if (adviserPriviewState.imgFile.length === 0) {
        setProfileErr('프로필 이미지를 넣어주세요.');
        return false;
      } else {
        setProfileErr('');
      }
    }
    if (funcName === 'name') {
      if (name === '') {
        setNameErr('이름을 작성해주세요');
        return false;
      } else if (!nameRegularexpression.test(name)) {
        setNameErr('올바른 이름을 작성해주세요.');
        return false;
      } else {
        setNameErr('');
      }
    }
    if (funcName === 'category') {
      if (category === '') {
        setCategory('주 종목을 선택해주세요');
        return false;
      } else {
        setCategory('');
      }
    }
    if (funcName === 'detail') {
      if (detail === '') {
        setDetailErr('자기 소개를 작성해주세요');
        return false;
      } else {
        setDetailErr('');
      }
    }
    if (funcName === 'url') {
      if (url === '') {
        setUrlErr('대표 사이트를 작성해주세요');
        return false;
      } else if (!urlRegularexpression.test(url)) {
        setUrlErr('부정확한 url 형식입니다.');
        return false;
      } else {
        setUrlErr('');
      }
    }
    if (funcName === 'gender') {
      if (gender === '') {
        setGender('성별을 선택해주세요');
        return false;
      } else {
        setGender('');
      }
    }
    if (funcName === 'state') {
      if (state === '') {
        setStateErr('지역을 선택해주세요.');
        return false;
      } else {
        setStateErr('');
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
    checkValidation('confirm');
  }, [signUpInfo]);

  return (
    <AdvisorSignupPageStyle>
      {console.log('AdviserSignUp rendered!')}
      <ContainerStlye>
        <HeaderLogoStyle>
          <img src="../../imageFile/Logo2.png" alt="" />
          <div>안녕하세요.</div>
          <div>강사 회원가입</div>
        </HeaderLogoStyle>
        <InputAreaStyle>
          <div>계정정보</div>
          <UploadCompo where="adviser" />
          {profileErr ? <div>{profileErr}</div> : null}
          <LabelStyle>닉네임</LabelStyle>
          <Input
            name="username"
            type="text"
            onKeyUp={(e) => handleInputValue('username', e)}
            onBlur={() => checkValidation('username')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {usernameErr ? <div>{usernameErr}</div> : null}

          <LabelStyle>이메일</LabelStyle>
          <Input
            name="email"
            type="email"
            onChange={(e) => handleInputValue('email', e)}
            onBlur={() => checkValidation('email')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {emailErr ? <div>{emailErr}</div> : null}

          <LabelStyle>비밀번호</LabelStyle>
          <Input
            name="password"
            type="password"
            onChange={(e) => handleInputValue('password', e)}
            onBlur={() => checkValidation('password')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {passwordErr ? <div>{passwordErr}</div> : null}

          <LabelStyle>비밀번호 확인</LabelStyle>
          <Input
            name="confirmPassword"
            type="password"
            onChange={(e) => {
              handleInputValue('confirmPassword', e);
            }}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {confirmPasswordErr ? <div>{confirmPasswordErr}</div> : null}

          <LabelStyle>이름</LabelStyle>
          <Input
            name="name"
            type="text"
            onChange={(e) => handleInputValue('name', e)}
            onBlur={() => checkValidation('name')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {nameErr ? <div>{nameErr}</div> : null}

          <LabelStyle>성별</LabelStyle>
          <div>
            <Radio.Group
              name="gender"
              optionType={'button'}
              buttonStyle="solid"
              onChange={(e) => handleInputValue('gender', e)}
              onBlur={() => {
                console.log('어후야');
                checkValidation('gender');
              }}>
              <Radio.Button value="남자">남자</Radio.Button>
              <Radio.Button value="여자">여자</Radio.Button>
            </Radio.Group>
          </div>
          {genderErr ? <div>{genderErr}</div> : null}

          <LabelStyle>지역</LabelStyle>
          <div>
            <SelectBox
              func={handleInputValue}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
              keyData={'state'}
              name="state"
              validation={checkValidation}
            />
          </div>
          {stateErr ? <div>{stateErr}</div> : null}

          <LabelStyle>종목</LabelStyle>
          <div>
            <SelectBox
              func={handleInputValue}
              data={['헬스', '골프', '클라이밍', '기타-추가예정']}
              keyData={'category'}
              name="category"
              validation={checkValidation}
            />
          </div>
          {categoryErr ? <div>{categoryErr}</div> : null}

          <LabelStyle>디테일</LabelStyle>
          <div>
            <Input.TextArea
              name="detail"
              maxLength={300}
              onChange={(e) => handleInputValue('detail', e)}
              onBlur={() => checkValidation('detail')}
            />
          </div>
          {detailErr ? <div>{detailErr}</div> : null}

          <LabelStyle>Url</LabelStyle>
          <div>
            <Input onChange={(e) => handleInputValue('url', e)} onKeyUp={() => checkValidation('url')} />
          </div>
          {urlErr ? <div>{urlErr}</div> : null}
          <ButtonStyle type="primary" onClick={handleSignUp} disabled={disable}>
            회원가입
          </ButtonStyle>
        </InputAreaStyle>
      </ContainerStlye>
    </AdvisorSignupPageStyle>
  );
}

export default AdvisorSignUpPage;
