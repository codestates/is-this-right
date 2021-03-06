import React, { useState, useEffect } from 'react';
import { Avatar, Button, Popover } from 'antd';
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
  /* background: #0177b6; */
  display: flex;
  flex-direction: column;
  border: ${(props) => (props.isSelected ? '1px solid #12A803' : '1px solid #ddd')};
  /* color: #fff; */
  color: #000;
  border-radius: 10px;
  /* box-shadow: ${(props) => (props.isSelected ? '0 0 5px rgba(248, 187, 0, 0.6)' : 'none')}; */
  .name {
    font-family: 'font-css';
  }
  .editFeedbackSection {
    .editButtonSection {
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 10px 10px;
      font-size: 0.9rem;
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      gap: 20px;
      font-family: 'font-css';
      @media ${(props) => props.theme.mobile} {
        gap: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .deleteButton {
        background: #ddd;
        padding: 10px 30px 10px 30px;
        border-radius: 7px;
        :hover {
          cursor: pointer;
          background: rgb(221, 221, 221, 0.8);
          transition: 0.2s;
        }
      }
      .updateButton {
        color: #fafafa;
        background: #0077b6;
        padding: 10px 30px 10px 30px;
        border-radius: 7px;
        :hover {
          cursor: pointer;
          background: rgb(0, 119, 182, 0.9);
          transition: 0.2s;
        }
      }
    }
  }
`;

const ContentStyle = styled.div`
  padding: 30px;
  width: 80%;
  background: #fff;
  width: 100%;
  border-radius: 0 0 10px 10px;
  min-height: 30%;
  /* ????????? ?????? ??????  */
  > p > img {
    width: 200px;
  }
`;

const AdviserInfoStyle = styled.div`
  padding: 15px 30px 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(221, 221, 255, 0.6);
  .infoSection {
    gap: 20px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    span {
      display: flex;
      gap: 10px;
      .username {
        display: flex;
        align-items: center;
      }
      :hover {
        cursor: pointer;
      }
    }
    .moment {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      color: #777;
      padding-right: 20px;
    }
  }
`;

const ButtonSectionStyle = styled.div`
  margin-top: 20px;

  display: inline-block;
  /* float: right; */
`;

const ButtonStyle = styled(Button)`
  margin-left: 10px;
  color: white;
  background-color: #00baef;
`;

const DivButtonStyle = styled.div`
  margin: 2px;
  transition: all 0.3s;
  .name {
    font-family: 'font-css';
  }
  :hover {
    cursor: pointer;
    color: #40a9ff;
  }
`;

function FeedbackContainer({
  adviser,
  postUserId,
  isSelected,
  getDetailData,
  checkSelect,
  handleSelection,
  handleSelectionCancel,
  setIsReply,
}) {
  const state = useSelector((state) => state.userReducer);
  console.log(adviser);
  const [isEdit, setIsEdit] = useState(false);
  const [testT, setTestT] = useState(adviser.content);
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
      setIsReply(false);
      handleIsEdit();
      getDetailData();
    });
  };
  // "id":5
  // "adviserId" : 3
  // "name" : "?????????"
  // "profileImg" : "img.jpg"
  // "content" : "???????????????????????????."
  // "createdAt" : 2021-08-04
  // "updatedAt" : 2021-08-04
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const sendDataToDetailPage = () => {
    history.push(`/advisers/${adviser.adviserId}`);
  };

  return (
    <FeedbackContainerStyle isSelected={isSelected}>
      <AdviserInfoStyle>
        <div className="infoSection">
          <Popover
            placement="bottom"
            content={
              <DivButtonStyle onClick={sendDataToDetailPage}>
                <span className="name">{adviser.name}</span>?????? ?????? ????????????
              </DivButtonStyle>
            }
            trigger="click">
            <div className="avatar">
              <Avatar size={50} icon={<img src={adviser.profileImg} />} />
            </div>
            <div className="name username">{adviser.name}</div>
          </Popover>
          <div className="moment">
            <Moment fromNow>{startTime}</Moment>
          </div>
        </div>
        {state.userInfo.adviserId === adviser.adviserId ? (
          <Button onClick={handleIsEdit}>Edit</Button>
        ) : postUserId === state.userInfo.id ? (
          isSelected ? (
            <CheckCircleOutlined style={{ color: '#12A803', fontSize: '1.2rem' }} onClick={handleSelectionCancel} />
          ) : (
            <CheckCircleOutlined style={{ color: '#ddd', fontSize: '1.2rem' }} onClick={handleSelection} />
          )
        ) : isSelected ? (
          <CheckCircleOutlined style={{ color: '#12A803', fontSize: '1.2rem' }} />
        ) : null}
      </AdviserInfoStyle>
      {isEdit ? (
        <div className="editFeedbackSection">
          <TextEditor text={setTestT} data={adviser.content} />
          <div className="editButtonSection">
            <div className="deleteButton" onClick={handleDeleteFeedback}>
              Delete
            </div>
            <div className="updateButton" onClick={handlePutFeedback}>
              Update
            </div>
          </div>
        </div>
      ) : (
        <ContentStyle>{parse(adviser.content)}</ContentStyle>
      )}
    </FeedbackContainerStyle>
  );
}

export default FeedbackContainer;
