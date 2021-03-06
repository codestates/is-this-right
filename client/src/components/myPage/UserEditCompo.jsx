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
          alert('??????????????? ?????????????????????.');
          window.location.replace('/');
        })
        .catch((err) => {
          setEditErr('????????? ????????? ????????????. ?????? ??? ?????? ?????? ????????????.');
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

    const nameRegularexpression = /^[???-???]+$/;
    const urlRegularexpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (funcName === 'username') {
      if (username === '') {
        setUsernameErr('???????????? ??????????????????.');
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
              setUsernameErr('????????? ???????????? ????????????.');
            }
          });
      }
    }
    if (funcName === 'name') {
      if (name === '') {
        setNameErr('????????? ??????????????????');
      } else if (!nameRegularexpression.test(name)) {
        setNameErr('????????? ????????? ??????????????????.');
      } else {
        setNameErr('');
      }
    }
    if (funcName === 'detail') {
      if (text === '') {
        setDetailErr('?????? ????????? ??????????????????');
      } else {
        setDetailErr('');
      }
    }
    if (funcName === 'url') {
      if (url === '') {
        setUrlErr('?????? ???????????? ??????????????????');
      } else if (!urlRegularexpression.test(url)) {
        setUrlErr('???????????? url ???????????????.');
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
    console.log('?????? ?????????????????????.', userInfo);
    console.log(editInfo);
  }, [editInfo]);
  return (
    <UserPostListCompoStyle>
      <HideInputStyle>
        <UploadCompo where={userInfo.role} />
        <LabelStyle htmlFor="username">?????????</LabelStyle>
        <InputStyle
          name="username"
          type="text"
          size="large"
          style={{ margin: '12px 0 6px 0' }}
          placeholder="???????????? ??????????????????"
          onChange={(e) => handleInputValue('username', e)}
          onBlur={() => checkValidation('username')}
          value={editInfo.username}
          required
        />
        {usernameErr ? <AlertMessageStyle>{usernameErr}</AlertMessageStyle> : null}
        <LabelStyle htmlFor="user-email">?????????</LabelStyle>
        <InputStyle
          name="user-email"
          type="email"
          size="large"
          value={editInfo.email} //????????? ????????? ??????
          style={{ margin: '12px 0 6px 0', color: 'black' }}
          placeholder="???????????? ??????????????????"
          disabled="true"
          required
        />
      </HideInputStyle>
      <HideInputStyle ref={userHide}>
        <LabelStyle htmlFor="name">??????</LabelStyle>
        <div>
          <InputStyle
            name="name"
            type="text"
            size="large"
            style={{ margin: '12px 0 6px 0' }}
            placeholder="????????? ??????????????????"
            onChange={(e) => handleInputValue('name', e)}
            onBlur={() => checkValidation('name')}
            value={editInfo.name}
            required
          />
          {nameErr ? <AlertMessageStyle>{nameErr}</AlertMessageStyle> : null}
        </div>
        <LabelStyle htmlFor="gender">??????</LabelStyle>
        <div>
          <Radio.Group
            defaultValue={userInfo.gender}
            name="gender"
            optionType={'button'}
            onChange={(e) => handleInputValue('gender', e)}>
            <Radio.Button value="??????">??????</Radio.Button>
            <Radio.Button value="??????">??????</Radio.Button>
          </Radio.Group>
        </div>
        <LabelStyle htmlFor="state">??????</LabelStyle>
        <div>
          <SelectBox
            func={handleInputValue}
            data={['??????', '??????/??????', '?????????', '?????????', '?????????', '?????????', '?????????']}
            keyData={'state'}
            name="state"
            validation={checkValidation}
            defaultValue={userInfo.state}
          />
        </div>
        <LabelStyle htmlFor="category">??????</LabelStyle>
        <div>
          <SelectBox
            func={handleInputValue}
            data={['??????', '??????', '????????????', '??????-????????????']}
            keyData={'category'}
            name="category"
            value={editInfo.category}
            validation={checkValidation}
          />
        </div>
        <LabelStyle htmlFor="detail">?????????</LabelStyle>
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
            placeholder="????????? ??????????????????"
            onChange={(e) => handleInputValue('url', e)}
            onBlur={() => checkValidation('url')}
            value={editInfo.url}
            required
          />
          {urlErr ? <AlertMessageStyle>{urlErr}</AlertMessageStyle> : null}
        </div>
      </HideInputStyle>
      <div className="updateButton" onClick={handleEditUser}>
        ????????????
      </div>
    </UserPostListCompoStyle>
  );
}

export default UserEditCompo;
