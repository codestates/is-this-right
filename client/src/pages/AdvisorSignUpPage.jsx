import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import UploadCompo from '../components/UploadCompo';
import { Input, Button, Radio } from 'antd';
import SelectBox from '../components/adviser/SelectBox';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TextEditor from '../components/textComponent/TextEditor';
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_API_URL;
const socialPw = process.env.REACT_APP_SOCIAL_PW;
const AdvisorSignupPageStyle = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const ContainerStlye = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

// const HeaderLogoStyle = styled.div`
//   background-color: #3957d1;
//   width: 600px;
//   height: 200px;
//   padding: 20px;
//   margin: 12px 12px 0;
// `;

const InputAreaStyle = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 12px;
  padding: 20px;
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ButtonStyle = styled(Button)`
  margin-top: 20px;
  height: 50px;
  width: 100%;
`;

const LabelStyle = styled.label`
  font-size: 1rem;
`;
const HideInputStyle = styled.div`
  margin: 0px;
`;
const HeadSectionStyle = styled.div`
  /* padding: 30% 150px 0px; */
  margin: 0px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 20px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 40px;
    margin-bottom: 0;
  }
`;

const AlertMessageStyle = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 3px;
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
  const [text, setText] = useState('');

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
    provider: 'origin',
  });
  const [signupErr, setSignupErr] = useState(null);
  const adviserPriviewState = useSelector((state) => state.userReducer.userProfileImg);
  const userState = useSelector((state) => state.userReducer);
  const socialHide = useRef(null);
  const history = useHistory();

  useEffect(() => {
    setSignUpInfo({ ...signUpInfo, detail: text });
  }, [text]);

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
    // && !validateErr ??????????????? ????????????
    console.log('?????????????????????', adviserPriviewState);
    const adviserImg = adviserPriviewState.imaFile;
    console.log(adviserImg);
    const formData = new FormData();
    formData.append('profileImg', adviserImg);
    // for (let el of adviserImg) {
    //   formData.append('files', el);
    // }
    for (let key in signUpInfo) {
      formData.append(key, signUpInfo[key]);
    }
    console.log(signUpInfo);
    if (Object.values(signUpInfo).length === 11) {
      axios
        .post(`${serverUrl}/advisers`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          alert('??????????????? ?????????????????????.');
          history.push('/');
        })
        .catch((err) => {
          setSignupErr('????????? ????????? ????????????. ?????? ??? ?????? ?????? ????????????.');
        });
    }
    // window.location.replace('SignIn'); // ?????? ????????????
  };

  const checkValidation = (funcName) => {
    const { email, password, username, confirmPassword, name, category, detail, url, gender, state } = signUpInfo;

    const emailRegularexpression = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const nameRegularexpression = /^[???-???]+$/;
    const urlRegularexpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    const passwordStr = password.search(/(?=.*\d)/g);
    const passwordSpe = password.search(/(?=.*[!@#$%^&+=])/gi);
    if (funcName === 'email') {
      if (email === '') {
        setEmailErr('???????????? ??????????????????.');
        return false;
      } else if (!emailRegularexpression.test(email)) {
        setEmailErr('????????? ????????? ?????? ????????????.');
        return false;
      } else {
        axios
          .get(`${serverUrl}/users/?email=${email}`)
          .then((ok) => {
            setEmailErr('');
            return true;
          })
          .catch((err) => {
            setEmailErr('????????? ???????????? ????????????.');
            return false;
          });
      }
    }
    if (funcName === 'username') {
      if (username === '') {
        setUsernameErr('???????????? ??????????????????.');
        return false;
      } else {
        axios
          .get(`${serverUrl}/users/?username=${username}`)
          .then((ok) => {
            setUsernameErr('');
            return true;
          })
          .catch((err) => {
            setUsernameErr('????????? ???????????? ????????????.');
            return false;
          });
      }
    }
    if (funcName === 'password') {
      if (password === '') {
        setPasswordErr('??????????????? ??????????????????.');
        return false;
      } else if (password.search(/\s/g) !== -1) {
        setPasswordErr('????????? ????????????????????????.');
        return false;
      } else if (passwordStr < 0 || passwordSpe < 0) {
        setPasswordErr('??????, ??????, ??????????????? ?????????????????????.');
        return false;
      } else if (password.length < 8 || password.length > 20) {
        setPasswordErr('??????????????? 8?????? ~20???????????????.');
        return false;
      } else {
        setPasswordErr('');
        return true;
      }
    }
    if (funcName === 'confirm') {
      if (password !== confirmPassword && confirmPassword !== '') {
        setConfirmPasswordErr('??????????????? ???????????? ????????????.');
        return false;
      } else {
        setConfirmPasswordErr('');
        return true;
      }
    }
    if (funcName === 'profileImg') {
      if (adviserPriviewState.imgFile.length === 0) {
        setProfileErr('????????? ???????????? ???????????????.');
        return false;
      } else {
        setProfileErr('');
      }
    }
    if (funcName === 'name') {
      if (name === '') {
        setNameErr('????????? ??????????????????');
        return false;
      } else if (!nameRegularexpression.test(name)) {
        setNameErr('????????? ????????? ??????????????????.');
        return false;
      } else {
        setNameErr('');
      }
    }
    if (funcName === 'category') {
      if (category === '') {
        setCategory('??? ????????? ??????????????????');
        return false;
      } else {
        setCategory('');
      }
    }
    if (funcName === 'detail') {
      if (text === '') {
        setDetailErr('?????? ????????? ??????????????????');
        return false;
      } else {
        setDetailErr('');
      }
    }
    if (funcName === 'url') {
      if (url === '') {
        setUrlErr('?????? ???????????? ??????????????????');
        return false;
      } else if (!urlRegularexpression.test(url)) {
        setUrlErr('???????????? url ???????????????.');
        return false;
      } else {
        setUrlErr('');
      }
    }
    if (funcName === 'gender') {
      if (gender === '') {
        setGender('????????? ??????????????????');
        return false;
      } else {
        setGender('');
      }
    }
    if (funcName === 'state') {
      if (state === '') {
        setStateErr('????????? ??????????????????.');
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
      isDisabled =
        isDisabled &&
        signUpInfo[key] !== '' &&
        signUpInfo['password'] === signUpInfo['confirmPassword'] &&
        !urlErr &&
        !usernameErr &&
        !nameErr;
    }
    setDisable(!isDisabled);
    console.log(disable);
  }, [signUpInfo, urlErr, usernameErr, nameErr]);

  useEffect(() => {
    setSignupErr('');
    checkValidation('confirm');
  }, [signUpInfo]);

  useEffect(() => {
    let Url = new URL(window.location.href).pathname;
    if (Url.includes('Social')) {
      socialHide.current.style.display = 'none';
      setSignUpInfo({ ...signUpInfo, ...userState.signUpInfo, password: socialPw, confirmPassword: socialPw });
    }
  }, []);
  return (
    <AdvisorSignupPageStyle>
      {console.log('AdviserSignUp rendered!')}
      <ContainerStlye>
        <HeadSectionStyle>
          <img src="../../imageFile/Logo.png" alt="" style={{ width: '200px' }} />
        </HeadSectionStyle>
        <InputAreaStyle>
          {/* <div>adviser Sign Up</div> */}
          <LabelStyle>????????? ?????????</LabelStyle>
          <UploadCompo where="adviser" />
          {profileErr ? <AlertMessageStyle>{profileErr}</AlertMessageStyle> : null}
          <LabelStyle>?????????</LabelStyle>
          <Input
            name="username"
            type="text"
            onKeyUp={(e) => handleInputValue('username', e)}
            onBlur={() => checkValidation('username')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="???????????? ??????????????????"
            required
          />
          {usernameErr ? <AlertMessageStyle>{usernameErr}</AlertMessageStyle> : null}
          <HideInputStyle ref={socialHide}>
            <LabelStyle>?????????</LabelStyle>
            <Input
              name="email"
              type="email"
              onChange={(e) => handleInputValue('email', e)}
              onBlur={() => checkValidation('email')}
              size="large"
              style={{ margin: '0px 0 6px 0' }}
              placeholder="???????????? ??????????????????"
              required
            />
            {emailErr ? <AlertMessageStyle>{emailErr}</AlertMessageStyle> : null}

            <LabelStyle>????????????</LabelStyle>
            <Input
              name="password"
              type="password"
              onChange={(e) => handleInputValue('password', e)}
              onBlur={() => checkValidation('password')}
              size="large"
              style={{ margin: '0px 0 6px 0' }}
              placeholder="???????????? ??????????????????"
              required
            />
            {passwordErr ? <AlertMessageStyle>{passwordErr}</AlertMessageStyle> : null}

            <LabelStyle>???????????? ??????</LabelStyle>
            <Input
              name="confirmPassword"
              type="password"
              onChange={(e) => {
                handleInputValue('confirmPassword', e);
              }}
              size="large"
              style={{ margin: '0px 0 6px 0' }}
              placeholder="???????????? ??????????????????"
              required
            />
            {confirmPasswordErr ? <AlertMessageStyle>{confirmPasswordErr}</AlertMessageStyle> : null}
          </HideInputStyle>
          <LabelStyle>??????</LabelStyle>
          <Input
            name="name"
            type="text"
            onChange={(e) => handleInputValue('name', e)}
            onBlur={() => checkValidation('name')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="???????????? ??????????????????"
            required
          />
          {nameErr ? <AlertMessageStyle>{nameErr}</AlertMessageStyle> : null}

          <LabelStyle>??????</LabelStyle>
          <div style={{ marginBottom: '4px' }}>
            <Radio.Group
              name="gender"
              optionType={'button'}
              buttonStyle="solid"
              onChange={(e) => handleInputValue('gender', e)}
              onBlur={() => {
                console.log('?????????');
                checkValidation('gender');
              }}>
              <Radio.Button value="??????">??????</Radio.Button>
              <Radio.Button value="??????">??????</Radio.Button>
            </Radio.Group>
          </div>
          {genderErr ? <AlertMessageStyle>{genderErr}</AlertMessageStyle> : null}

          <LabelStyle>??????</LabelStyle>
          <div>
            <SelectBox
              func={handleInputValue}
              data={['??????', '??????/??????', '?????????', '?????????', '?????????', '?????????', '?????????']}
              keyData={'state'}
              name="state"
              validation={checkValidation}
            />
          </div>
          {stateErr ? <AlertMessageStyle>{stateErr}</AlertMessageStyle> : null}

          <LabelStyle>??????</LabelStyle>
          <div>
            <SelectBox
              func={handleInputValue}
              data={['??????', '??????', '????????????', '??????-????????????']}
              keyData={'category'}
              name="category"
              validation={checkValidation}
            />
          </div>
          {categoryErr ? <div>{categoryErr}</div> : null}

          <LabelStyle>?????????</LabelStyle>
          <div>
            {/* <Input.TextArea
              name="detail"
              maxLength={300}
              onChange={(e) => handleInputValue('detail', e)}
              onBlur={() => checkValidation('detail')}
            /> */}
            <TextEditor text={setText} checkValidation={checkValidation} />
          </div>
          {detailErr ? <AlertMessageStyle>{detailErr}</AlertMessageStyle> : null}

          <LabelStyle>Url</LabelStyle>
          <div>
            <Input onChange={(e) => handleInputValue('url', e)} onKeyUp={() => checkValidation('url')} />
          </div>
          {urlErr ? <AlertMessageStyle>{urlErr}</AlertMessageStyle> : null}
          {signupErr ? <AlertMessageStyle>{signupErr}</AlertMessageStyle> : null}
          <ButtonStyle type="primary" onClick={handleSignUp} disabled={disable}>
            ????????????
          </ButtonStyle>
        </InputAreaStyle>
      </ContainerStlye>
    </AdvisorSignupPageStyle>
  );
}

export default AdvisorSignUpPage;
