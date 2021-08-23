import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Pagination, Result, Image } from 'antd';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setIsChat, setViewChatlist, setRoomName } from '../actions/chatAction';
import { Link, useParams } from 'react-router-dom';
import { SmileOutlined, MessageOutlined, MailOutlined, LinkOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';

import AdviserFeedbackDetail from '../components/adviser/AdviserFeedbackDetail';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const AdviserDetailContainer = styled(ContainerStlye)`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 100%;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }

  .userInfo {
    position: relative;
    width: 100%;
    height: 500px;
    margin-top: 50px;
    @media ${(props) => props.theme.mobile} {
      height: auto;
      display: flex;
      flex-direction: column;
    }
    .background-triangle-right {
      width: 0;
      height: 0;
      border-bottom: 100px solid #023e8a;
      border-left: 70vw solid transparent;
      opacity: 0.2;
      position: absolute;
      @media ${(props) => props.theme.mobile} {
        border-left: 100vw solid transparent;
      }
    }
    .background-triangle-left {
      width: 0;
      height: 0;
      border-bottom: 100px solid #023e8a;
      border-right: 70vw solid transparent;
      opacity: 0.2;
      position: absolute;
      @media ${(props) => props.theme.mobile} {
        border-right: 100vw solid transparent;
      }
    }
    .background {
      background: linear-gradient(60deg, #023e8a, #0077b6);
      width: 100%;
      height: 364px;
      position: absolute;
      margin-bottom: 36px;
      bottom: 0;
      @media ${(props) => props.theme.mobile} {
        height: 264px;
        bottom: auto;
        top: 100px;
      }
    }
    .left {
      position: relative;
      float: left;
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: column;
      @media ${(props) => props.theme.mobile} {
        float: none;
        width: 100%;
      }

      .avatarSection {
        display: flex;
        justify-content: center;
        position: relative;
      }
      .infoSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        border-right: 1px solid #cccccc;
        color: white;
        @media ${(props) => props.theme.mobile} {
          padding: 5px;
          border-right: none;
        }
        .name {
          font-size: 2rem;
        }
        .location {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #cccccc;
        }
        .category {
          margin-top: 20px;
          font-size: 1.5rem;
          @media ${(props) => props.theme.mobile} {
            margin-top: 5px;
          }
        }
        @media ${(props) => props.theme.mobile} {
          display: flex;
          justify-content: center;
          > div {
            display: flex;
            justify-content: center;
          }
        }
      }
      .iconSection {
        object-position: bottom;
        display: flex;
        font-size: 45px;
        gap: 20px;
        justify-content: flex-start;
        align-items: flex-end;
        height: 100%;
        left: 0;
        margin-left: 5vw;
        color: #023e8a;
        @media ${(props) => props.theme.mobile} {
          justify-content: center;
          margin-left: 0;
        }
        > div {
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 50%;
          padding: 15px;
          box-shadow: 0 0 10px rgba(3, 4, 94, 0.5);
          :hover {
            cursor: pointer;
            padding: 14px;
            box-shadow: 0 0 12px rgba(3, 4, 94, 0.8);
            transition: 0.1s ease-in-out;
          }
        }
        > div a {
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 50%;
          color: #023e8a;
        }
      }
    }
    .right {
      position: relative;
      float: right;
      width: 60%;
      height: 329px;
      padding: 40px;
      padding-right: 50px;
      margin-top: 100px;
      color: white;

      @media ${(props) => props.theme.mobile} {
        display: flex;
        flex-direction: column;
        align-items: center;
        float: none;
        margin: 0;
        padding: 30px;
        width: 100%;
        color: black;
        height: 300px;
      }
      .head {
        font-size: 1.5rem;
      }
      .detailSection {
        position: relative;
        height: 100%;
        overflow-y: scroll;
        @media ${(props) => props.theme.mobile} {
        }
      }
    }
  }
  .feedback {
    margin-top: 50px;
    margin-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dddddd;
    gap: 20px;
    padding: 20px;
    padding-bottom: 40px;
    padding-left: 5vw;
    padding-right: 5vw;
    box-shadow: 0 0 5px rgba(3, 4, 94, 0.3);
    @media ${(props) => props.theme.mobile} {
      margin: 0;
      position: relative;
      margin-bottom: 12vh;
      border-left: 0;
      border-right: 0;
    }
    .title {
      font-size: 1.2rem;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .feedbackContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-bottom: 20px;
      @media ${(props) => props.theme.mobile} {
        align-items: center;
      }
    }
  }
`;

function AdvisorDetailPage() {
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);
  const { id } = useParams();
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${url}/advisers/${id}`).then((data) => setAdviserDetailInfo(data.data.data));
  }, []);

  //pagination states
  const PAGE_SIZE = 3;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (adviserDetailInfo) {
      setCurrentPage(page);
      setCurrentPageList(adviserDetailInfo.feedbacks.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (adviserDetailInfo) {
      setCurrentPage(1);
      setCurrentPageList(adviserDetailInfo.feedbacks.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
  }, [adviserDetailInfo]);

  if (adviserDetailInfo === null) {
    return '정보를 받아오고 있습니다.';
  } else {
    console.log(adviserDetailInfo.feedbacks);
  }
  console.log(adviserDetailInfo);

  const createChatRoom = (userId) => {
    //방만들고 룸넘버 획득
    if (state.logIn) {
      let payload = {
        sender: state.userInfo.id,
        receiver: userId,
      };
      axios.post(`${url}/chats`, payload).then((data) => {
        dispatch(changeRoom(data.data.data.roomId));
        chatState.socket.emit('join', { room: data.data.data.roomId });
        dispatch(setIsChat(true));
        dispatch(setViewChatlist(false));
      });
      dispatch(setRoomName(adviserDetailInfo.name));
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  return (
    <BodyAreaStyle>
      <AdviserDetailContainer>
        <div className="userInfo">
          <div className="background-triangle-right" />
          <div className="background-triangle-left" />
          <div className="background" />
          <div className="left">
            <div className="avatarSection">
              <Avatar size={200} src={<img src={adviserDetailInfo.profileImg} />} />
            </div>
            <div className="infoSection">
              <div className="name">{adviserDetailInfo.name}</div>
              <div className="location">
                <EnvironmentOutlined /> {adviserDetailInfo.state}
              </div>
              <div className="category">{adviserDetailInfo.category}</div>
            </div>
            <div className="iconSection">
              {/* <div>메일 : {adviserDetailInfo.email}</div>
              <div>
                URL : <a href={adviserDetailInfo.url}>{adviserDetailInfo.url}</a>
              </div> */}
              <div>
                <MessageOutlined onClick={() => createChatRoom(adviserDetailInfo.userId)} />
              </div>
              <div>
                <a href={'mailto:' + adviserDetailInfo.email}>
                  <MailOutlined />
                </a>
              </div>
              <div>
                <a href={adviserDetailInfo.url} target="_blank">
                  <LinkOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="head">소개</div>
            <div className="detailSection">
              <div className="content">{parse(adviserDetailInfo.detail)}</div>
            </div>
          </div>
        </div>
        <div className="feedback">
          <div className="title">{adviserDetailInfo.name}님이 남긴 답변들</div>
          <div className="feedbackContainer">
            {adviserDetailInfo.feedbacks.length === 0 ? (
              <Result icon={<SmileOutlined style={{ color: '#0077b6' }} />} title="등록된 답변이 없습니다." />
            ) : (
              currentPageList.map((el) => (
                <Link to={`/posts/${el.postId}`} style={{ textDecorationLine: 'none' }}>
                  <AdviserFeedbackDetail data={el} />
                </Link>
              ))
            )}
          </div>
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPage}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            total={adviserDetailInfo.feedbacks.length || 1}
          />
        </div>
      </AdviserDetailContainer>
    </BodyAreaStyle>
  );
}

export default AdvisorDetailPage;
