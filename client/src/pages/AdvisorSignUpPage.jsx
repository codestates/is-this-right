import React, { useState } from 'react';
import styled from 'styled-components';
import UploadCompo from '../components/UploadCompo';
import { Input, Button, Radio, Select } from 'antd';
import SelectBox from '../components/adviser/SelectBox';

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
  const [imgFile, setImgFile] = useState(null); //파일
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImg: imgFile,
    name: '',
    category: '',
    detail: '',
    url: '',
    gender: '',
    state: '',
  });

  const handleInputValue = (key) => (e) => {
    console.log(key);

    console.log(e);
    console.log(signUpInfo);
    if (key === 'state') {
      setSignUpInfo({ ...signUpInfo, [key]: e });
    } else if (key === 'category') {
      setSignUpInfo({ ...signUpInfo, [key]: e });
    } else {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    }
  };

  const handleSignUp = () => {
    const { username, email, password, confirmPassword, profileImg, name, category, detail, url, gender, state } =
      signUpInfo;
    // && !validateErr 유효성검사 넣어야함
    console.log(signUpInfo);
    if (Object.values(signUpInfo).length === 8) {
      // axios
      //   .post(`${url}advisers`, {username, email, password, profileImg, name, category, detail, url, gender, state})
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

  return (
    <AdvisorSignupPageStyle>
      <ContainerStlye>
        <HeaderLogoStyle>
          <img src="../../imageFile/Logo2.png" alt="" />
          <div>안녕하세요.</div>
          <div>강사 회원가입</div>
        </HeaderLogoStyle>
        <InputAreaStyle>
          <div>계정정보</div>
          <UploadCompo where="adviser" setImgFile={setImgFile} />
          <LabelStyle>닉네임</LabelStyle>
          <Input
            name="username"
            type="text"
            onChange={handleInputValue('username')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle>이메일</LabelStyle>
          <Input
            name="email"
            type="email"
            onChange={handleInputValue('email')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle>비밀번호</LabelStyle>
          <Input
            name="password"
            type="password"
            onChange={handleInputValue('password')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle>비밀번호 확인</LabelStyle>
          <Input
            name="confirmPassword"
            type="password"
            onChange={handleInputValue('confirmPassword')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle>이름</LabelStyle>
          <Input
            name="name"
            type="text"
            onChange={handleInputValue('name')}
            size="large"
            style={{ margin: '0px 0 6px 0' }}
            placeholder="닉네임을 입력해주세요"
            required
          />
          <LabelStyle>성별</LabelStyle>
          <div>
            <Radio.Group name="gender" optionType={'button'} buttonStyle="solid" onChange={handleInputValue('gender')}>
              <Radio.Button value="남자">남자</Radio.Button>
              <Radio.Button value="여자">여자</Radio.Button>
            </Radio.Group>
          </div>
          <LabelStyle>지역</LabelStyle>
          <div>
            <SelectBox func={handleInputValue} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} keyData={'state'} />
          </div>
          <LabelStyle>종목</LabelStyle>
          <div>
            <SelectBox
              func={handleInputValue}
              data={['헬스', '골프', '클라이밍', '기타-추가예정']}
              keyData={'category'}
            />
          </div>
          <LabelStyle>디테일</LabelStyle>
          <div>
            <Input.TextArea name="detail" maxLength={300} onChange={handleInputValue('detail')} />
          </div>
          <LabelStyle>Url</LabelStyle>
          <div>
            {' '}
            <Input.TextArea name="url" maxLength={100} onChange={handleInputValue('url')} />
          </div>
          <ButtonStyle
            type="primary"
            onClick={handleSignUp}
            //  disabled={disable}
          >
            회원가입
          </ButtonStyle>
        </InputAreaStyle>
      </ContainerStlye>
    </AdvisorSignupPageStyle>
  );
}

export default AdvisorSignUpPage;
