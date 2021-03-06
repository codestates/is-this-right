import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button, Radio } from 'antd';
import styled, { keyframes } from 'styled-components';
import UploadCompo from '../UploadCompo';
import { useSelector } from 'react-redux';
import SelectBox from '../adviser/SelectBox';
import TextEditor from '../textComponent/TextEditor';
import axios from 'axios';
import parse from 'html-react-parser';

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_API_URL;

const UserPostListCompoStyle = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .updateButton {
    background: #0077b6;
    padding: 10px 30px 10px 30px;
    font-family: 'font-css';
    margin: 20px;
    color: #fafafa;
    border-radius: 7px;
    :hover {
      cursor: pointer;
      background: rgb(0, 119, 182, 0.8);
      transition: 0.2s;
    }
  }
`;

const LabelStyle = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 1rem;
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
  width: 70%;
  min-width: 500px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    min-width: 0;
  }
`;

const textFade = keyframes`
0% { color:white;}
50% { color:red;}
        100% {color:white; }
`;
const AlertMessageStyle = styled.div`
  text-align: left;
  color: red;
`;

function UserEditCompo() {
  const [editInfo, setEditInfo] = useState({
    username: '',
    email: '',
    name: '',
    category: '',
    detail: '',
    url: '',
    gender: '',
    state: '',
  });
  const [text, setText] = useState('');
  const [usernameErr, setUsernameErr] = useState(null);
  const [nameErr, setNameErr] = useState(null);
  const [detailErr, setDetailErr] = useState(null);
  const [urlErr, setUrlErr] = useState(null);
  const [editErr, setEditErr] = useState(null);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const preview = useSelector((state) => state.userReducer.userProfileImg);
  const userHide = useRef(null);
  console.log(userInfo);
  console.log(preview);

  const handleInputValue = (key, e) => {
    if (key === 'state') {
      setEditInfo({ ...editInfo, [key]: e });
    } else if (key === 'category') {
      setEditInfo({ ...editInfo, [key]: e });
    } else {
      setEditInfo({ ...editInfo, [key]: e.target.value });
    }
  };

  const handleEditUser = () => {
    let { username, name, detail, url } = editInfo;
    if (
      (userInfo.role === 'adviser' && username && name && detail && url && !usernameErr) ||
      (userInfo.role === 'user' && username && !usernameErr)
    ) {
      console.log(preview);
      const formData = new FormData();
      const img = preview.imaFile;

      formData.append('profileImg', img);

      for (let key in editInfo) {
        formData.append(key, editInfo[key]);
      }
      let role = userInfo.role;
      axios
        .put(`${serverUrl}/${role}s`, formData, {
          header: { 'Content-Type': 'multipart/form-data' },
        })
        .then((result) => {
          alert('회원정보가 수정되었습니다.');
          window.location.replace('/');
        })
        .catch((err) => {
          setEditErr('잘못된 정보가 있습니다. 확인 후 다시 시도 해주세요.');
        });
    } else {
      checkValidation('username');
      checkValidation('name');
      checkValidation('detail');
      checkValidation('url');
    }
  };
  const checkValidation = (funcName) => {
    const { username, name, detail, url } = editInfo;

    const nameRegularexpression = /^[가-힣]+$/;
    const urlRegularexpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (funcName === 'username') {
      if (username === '') {
        setUsernameErr('닉네임을 입력해주세요.');
      } else {
        axios
          .get(`${serverUrl}/users/?username=${username}`)
          .then((ok) => {
            setUsernameErr('');
          })
          .catch((err) => {
            if (username === userInfo.username) {
              setUsernameErr('');
            } else {
              setUsernameErr('중복된 닉네임이 있습니다.');
            }
          });
      }
    }
    if (funcName === 'name') {
      if (name === '') {
        setNameErr('이름을 작성해주세요');
      } else if (!nameRegularexpression.test(name)) {
        setNameErr('올바른 이름을 작성해주세요.');
      } else {
        setNameErr('');
      }
    }
    if (funcName === 'detail') {
      if (text === '') {
        setDetailErr('자기 소개를 작성해주세요');
      } else {
        setDetailErr('');
      }
    }
    if (funcName === 'url') {
      if (url === '') {
        setUrlErr('대표 사이트를 작성해주세요');
      } else if (!urlRegularexpression.test(url)) {
        setUrlErr('부정확한 url 형식입니다.');
      } else {
        setUrlErr('');
      }
    }
  };

  useEffect(() => {
    setEditInfo({ ...editInfo, detail: text });
  }, [text]);

  useEffect(() => {
    if (userInfo.role === 'user') {
      userHide.current.style.display = 'none';
    }
    let { username, email, name, detail, url, gender, state, category } = userInfo;
    setEditInfo((state1) => {
      return { username, email, name, detail, url, gender, state, category };
    });
    setText(detail);
  }, [userInfo]);

  useEffect(() => {
    console.log('기존 유저정보입니다.', userInfo);
    console.log(editInfo);
  }, [editInfo]);
  return (
    <UserPostListCompoStyle>
      <HideInputStyle>
        <UploadCompo where={userInfo.role} />
        <LabelStyle htmlFor="username">닉네임</LabelStyle>
        <InputStyle
          name="username"
          type="text"
          size="large"
          style={{ margin: '12px 0 6px 0' }}
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => handleInputValue('username', e)}
          onBlur={() => checkValidation('username')}
          value={editInfo.username}
          required
        />
        {usernameErr ? <AlertMessageStyle>{usernameErr}</AlertMessageStyle> : null}
        <LabelStyle htmlFor="user-email">이메일</LabelStyle>
        <InputStyle
          name="user-email"
          type="email"
          size="large"
          value={editInfo.email} //프롭스 들어갈 위치
          style={{ margin: '12px 0 6px 0', color: 'black' }}
          placeholder="이메일을 입력해주세요"
          disabled="true"
          required
        />
      </HideInputStyle>
      <HideInputStyle ref={userHide}>
        <LabelStyle htmlFor="name">이름</LabelStyle>
        <div>
          <InputStyle
            name="name"
            type="text"
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="이름을 입력해주세요"
            onChange={(e) => handleInputValue('name', e)}
            onBlur={() => checkValidation('name')}
            value={editInfo.name}
            required
          />
          {nameErr ? <AlertMessageStyle>{nameErr}</AlertMessageStyle> : null}
        </div>
        <LabelStyle htmlFor="gender">성별</LabelStyle>
        <div>
          <Radio.Group
            defaultValue={userInfo.gender}
            name="gender"
            optionType={'button'}
            onChange={(e) => handleInputValue('gender', e)}>
            <Radio.Button value="남자">남자</Radio.Button>
            <Radio.Button value="여자">여자</Radio.Button>
          </Radio.Group>
        </div>
        <LabelStyle htmlFor="state">지역</LabelStyle>
        <div>
          <SelectBox
            func={handleInputValue}
            data={['서울', '경기/인천', '강원도', '충청도', '경상도', '전라도', '제주도']}
            keyData={'state'}
            name="state"
            validation={checkValidation}
            defaultValue={userInfo.state}
          />
        </div>
        <LabelStyle htmlFor="category">종목</LabelStyle>
        <div>
          <SelectBox
            func={handleInputValue}
            data={['헬스', '골프', '클라이밍', '기타-추가예정']}
            keyData={'category'}
            name="category"
            value={editInfo.category}
            validation={checkValidation}
          />
        </div>
        <LabelStyle htmlFor="detail">디테일</LabelStyle>
        <div>
          <TextEditor text={setText} checkValidation={checkValidation} data={userInfo.detail} />
          {detailErr ? <AlertMessageStyle>{detailErr}</AlertMessageStyle> : null}
        </div>
        <div>
          <LabelStyle htmlFor="url">Url</LabelStyle>
          <InputStyle
            name="url"
            type="text"
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="주소를 입력해주세요"
            onChange={(e) => handleInputValue('url', e)}
            onBlur={() => checkValidation('url')}
            value={editInfo.url}
            required
          />
          {urlErr ? <AlertMessageStyle>{urlErr}</AlertMessageStyle> : null}
        </div>
      </HideInputStyle>
      <div className="updateButton" onClick={handleEditUser}>
        수정하기
      </div>
    </UserPostListCompoStyle>
  );
}

export default UserEditCompo;
