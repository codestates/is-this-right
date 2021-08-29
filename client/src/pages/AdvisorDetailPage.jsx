import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Pagination, Result, Image, Spin } from 'antd';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setIsChat, setViewChatlist, setRoomName, setMessages } from '../actions/chatAction';
import { Link, useHistory, useParams } from 'react-router-dom';
import { SmileOutlined, MessageOutlined, MailOutlined, LinkOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';

import AdviserFeedbackDetail from '../components/adviser/AdviserFeedbackDetail';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const AdviserBodyAreaStyle = styled(BodyAreaStyle)`
  background: #f4f4f4;
  @media ${(props) => props.theme.mobile} {
    background: #fff;
  }
`;

const AdviserDetailContainer = styled(ContainerStlye)`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 100%;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
  .name {
    font-family: 'font-css';
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
      box-shadow: 0 0 5px rgba(3, 4, 94, 0.5);
      border-radius: 0 0 3px 3px;
      @media ${(props) => props.theme.mobile} {
        height: 264px;
        bottom: auto;
        top: 100px;
        border-radius: 0;
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
          background: #fafafa;
          border-radius: 50%;
          padding: 15px;
          border: 1px solid #ddd;
          box-shadow: 0 0 7px rgba(3, 4, 94, 0.3);
          :hover {
            cursor: pointer;
            box-shadow: 0 0 10px rgba(3, 4, 94, 0.5);
            transition: 0.1s ease-in-out;
          }
        }
        > div a {
          display: flex;
          align-items: center;
          background: #fafafa;
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
        height: auto;
        max-height: 300px;
      }
      .head {
        font-size: 1.5rem;
        font-family: 'font-css';
      }
      .detailSection {
        position: relative;
        margin-top: 20px;
        height: 100%;
        overflow-y: auto;
        -ms-overflow-style: none;
      }
      .detailSection::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .feedback {
    color: #353535;
    margin-top: 50px;
    margin-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 40px;
    /* border: 1px solid #dddddd; */
    /* border-radius: 10px;
    box-shadow: 0 0 5px rgba(3, 4, 94, 0.3); */
    @media ${(props) => props.theme.mobile} {
      border-top: 1px solid #f1f1f1;
      box-shadow: 0 0 2px rgba(3, 4, 94, 0.2);
      margin: 0;
      position: relative;
      margin-bottom: 12vh;
      border-left: 0;
      border-right: 0;
      background: #f4f4f4;
    }
    .title {
      width: 100%;
      display: flex;
      font-size: 1.3rem;
      margin-top: 10px;
      margin-bottom: 10px;
      @media ${(props) => props.theme.mobile} {
        width: auto;
        margin-top: 20px;
        margin-bottom: 0;
      }
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
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${url}/advisers/${id}`).then((data) => setAdviserDetailInfo(data.data.data));
    //챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
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
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="데이터를 받아오고 있습니다."></Spin>
      </div>
    );
  }

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
      history.push('/SignIn');
    }
  };

  return (
    <AdviserBodyAreaStyle>
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
          <div className="title">
            <div className="name">{adviserDetailInfo.name}</div>'s Feedbacks
          </div>
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
    </AdviserBodyAreaStyle>
  );
}

export default AdvisorDetailPage;
