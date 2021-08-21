import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import { useHistory, useParams } from 'react-router-dom';
import TextEditor from '../textComponent/TextEditor';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ko';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const FeedbackContainerStyle = styled.div`
  background-color: #fff;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 10px;
  padding-bottom: 30px;
  border: ${(props) => (props.isSelected ? '2px solid #34d058' : '1px solid #e1e4e8')};

  border-radius: 6px;
`;

const ContentStyle = styled.div`
  width: 80%;
  min-height: 30%;
  padding: 15px;
  /* 이미지 크기 수정  */
  > p > img {
    width: 200px;
  }
`;

const AdviserInfoStyle = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonSectionStyle = styled.div`
  margin-top: 20px;

  display: inline-block;
  float: right;
`;

const ButtonStyle = styled(Button)`
  margin-left: 10px;
  color: white;
  background-color: #00baef;
`;

function FeedbackContainer({
  adviser,
  postUserId,
  isSelected,
  getDetailData,
  checkSelect,
  handleSelection,
  handleSelectionCancel,
}) {
  const state = useSelector((state) => state.userReducer);
  console.log(adviser);
  const [isEdit, setIsEdit] = useState(false);
  const [testT, setTestT] = useState('');
  const [selected, setSelected] = useState(isSelected);
  console.log(selected, isSelected);
  // console.log(parse(adviser.content));
  const nowTime = Date.now();
  const startTime = new Date(adviser.createdAt);
  const history = useHistory();
  useEffect(() => {
    checkSelect(!selected);
  }, [selected]);
  const handlePutFeedback = () => {
    axios.put(`${url}/feedbacks/${adviser.id}`, { content: testT }).then((result) => {
      handleIsEdit();
      getDetailData();
    });
  };

  const handleDeleteFeedback = () => {
    axios.delete(`${url}/feedbacks/${adviser.id}`).then((result) => {
      handleIsEdit();
      getDetailData();
    });
  };
  // "id":5
  // "adviserId" : 3
  // "name" : "김병민"
  // "profileImg" : "img.jpg"
  // "content" : "이걸고치셔야합니다."
  // "createdAt" : 2021-08-04
  // "updatedAt" : 2021-08-04
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <FeedbackContainerStyle isSelected={isSelected}>
      <AdviserInfoStyle>
        <span>
          <Avatar size={50} icon={<img src={adviser.profileImg} />} />
          <span style={{ margin: '0 5px 0 5px' }}>{adviser.name}</span>
          <Moment fromNow style={{ fontSize: '0.8rem', color: '#686868' }}>
            {startTime}
          </Moment>
        </span>
        {state.userInfo.adviserId === adviser.adviserId ? (
          <Button onClick={handleIsEdit}>Edit</Button>
        ) : postUserId === state.userInfo.id ? (
          isSelected ? (
            <CheckCircleTwoTone style={{ color: 'green', fontSize: '25px' }} onClick={handleSelectionCancel} />
          ) : (
            <CheckCircleOutlined style={{ color: '#686868', fontSize: '25px' }} onClick={handleSelection} />
          )
        ) : null}
      </AdviserInfoStyle>
      {isEdit ? (
        <div>
          <TextEditor text={setTestT} data={adviser.content} />
          <ButtonSectionStyle>
            <Button onClick={handleDeleteFeedback}>Delete Comment</Button>
            <ButtonStyle onClick={handlePutFeedback}>Update Comment</ButtonStyle>
          </ButtonSectionStyle>
        </div>
      ) : (
        <ContentStyle>{parse(adviser.content)}</ContentStyle>
      )}
    </FeedbackContainerStyle>
  );
}

export default FeedbackContainer;
