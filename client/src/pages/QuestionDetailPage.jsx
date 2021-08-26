import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Avatar, Popover, Button, Result, Pagination, Spin, Modal, Image } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import ReactPlayer from 'react-player';
import Moment from 'react-moment';
import 'moment/locale/ko';
import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
import QuestionPostPage from './QuestionPostPage';
import { setIsChat, setMessages, setViewChatlist, changeRoom } from '../actions/chatAction';
import parse from 'html-react-parser';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const PostDetailBodyStyle = styled(BodyAreaStyle)`
  background: #f4f4f4;
`;

const PostDetailContainer = styled(ContainerStlye)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 60vw;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
  //전체를 감싸는 박스
  .postInfo {
    /* box-shadow: 0 0 3px rgb(248, 187, 0, 0.5); */
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    border-radius: 20px 20px 0 0;
    background: #0077b6;
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .headerSection {
      border-radius: 20px 20px 0 0;
      background: #fafafa;
      /* background: #0077b6; */
      margin-bottom: 30px;
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      order: 1;
      .titleSection {
        border-radius: 20px 20px 0 0;
        /* background: rgb(248, 187, 0, 0.9); */
        /* background: #f7ac03; */
        border-bottom: 1px solid #dfdfdf;
        padding: 20px 30px 10px 30px;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .postTitle {
          height: 100%;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .optionButton {
          display: flex;
          align-items: center;
          :hover {
            cursor: pointer;
          }
        }
      }
      .userInfoSection {
        padding: 10px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding-right: 30px;
        padding-left: 30px;
        .moment {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }
        //popover
        span {
          display: flex;
          gap: 10px;
          .avatar {
            display: flex;
            align-items: center;
          }
          .username {
            display: flex;
            align-items: center;
            font-family: 'font-css';
          }
          :hover {
            cursor: pointer;
          }
        }
      }
    }

    .sourceSection {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px;
      min-height: 300px;
      min-width: 400px;
      width: 400px;
      flex: 1.5;
      order: 2;
      position: relative;
      .sourceContainer {
        background: #000;
        height: 300px;
        width: 400px;
        position: relative;
        font-size: 0rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .sourceContainer-control-prev {
          position: absolute;
          top: 46%;
          left: 0;
        }
        .sourceContainer-control-next {
          position: absolute;
          top: 46%;
          right: 0;
        }
        .sourceItem {
          height: 300px;
          width: 400px;
          position: relative;
          justify-content: center;
          align-items: center;
          /* .player-wrapper {
            position: relative;
            padding-top: 56.25%;
          } */

          /* .react-player {
            position: absolute;
            top: 0;
            left: 0;
          } */
        }
      }
    }
    .contentSection {
      margin-top: 50px;
      margin-bottom: 50px;
      padding-left: 50px;
      padding-right: 50px;
      border-left: 1px dashed #ddd;
      flex: 1;
      max-height: 300px;
      min-width: 200px;
      overflow-y: scroll;
      order: 3;
      display: flex;
      flex-direction: column;
      color: #fafafa;
    }
    .feedbackSection {
      background: #fcfcfc;
      /* background: #0077b6; */
      border-radius: 20px 20px 0 0;
      height: 100%;
      padding: 50px;
      display: flex;
      flex-direction: column;
      order: 4;
      width: 100%;
      @media ${(props) => props.theme.mobile} {
        margin-bottom: 12vh;
      }
      .feedbackContainer {
        display: flex;
        flex-direction: column;
        height: 100%;

        .feedbackHeader {
          color: #000;
          padding-top: 30px;
          padding-left: 20px;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .feedbackList {
          display: flex;
          flex-direction: column;
          padding: 20px;
          padding-top: none;
          gap: 20px;
        }
      }
      .pagination {
        padding: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .feedbackEditer {
      }
      .feedbackSubmit {
        background: #fafafa;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 5px 5px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        .submitButton {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          background: #0077b6;
          color: #fafafa;
          width: 150px;
          height: 40px;
          :hover {
            cursor: pointer;
            font-size: 1.05rem;
            transition: 0.2s;
          }
        }
      }
    }
  }
`;

// const CarouselStyle = styled(Carousel)`
//   position: relative;
//   background: #0000ff;
//   .carousel-control-next {
//     height: 50px;
//     position: absolute;
//     right: -15%;
//     margin-top: 50%;
//     font-size: 0rem;
//   }
//   .carousel-control-prev {
//     height: 50px;
//     position: absolute;
//     left: -15%;
//     margin-top: 50%;
//     font-size: 0rem;
//   }
// `;

const DivButtonStyle = styled.div`
  margin: 2px;
  transition: all 0.3s;
  :hover {
    cursor: pointer;
    color: #40a9ff;
  }
`;

function QuestionDetailPage() {
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  console.log('스테이트', state);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newFeed, setNewFeed] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [checkSelect, setCheckSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [editorFunction, setEditorFunction] = useState({ setData: () => {} });
  //pagination states
  const PAGE_SIZE = 5;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (post) {
      setCurrentPage(page);
      setCurrentPageList(post.data.feedbacks.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (post) {
      setCurrentPage(1);
      setCurrentPageList(post.data.feedbacks.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
    //챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
  }, [post]);

  const history = useHistory();
  const nowTime = Date.now();
  let startTime;

  // = new Date(data.updatedAt);

  useEffect(() => {
    getDetailData();
  }, [newFeed]);

  const getDetailData = () => {
    axios.get(`${url}/posts/${id}`).then((data) => {
      setPost(data.data);
      data.data.data.feedbacks.forEach((el) => {
        if (el.adviserId === state.userInfo.adviserId) {
          setIsReply(true);
          return;
        }
      });
    });
  };

  if (post === null) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="데이터를 받아오고 있습니다."></Spin>
      </div>
    );
  } else {
    console.log(post.data);
    startTime = new Date(post.data[0].updatedAt);
  }

  const sendUserPosts = () => {
    history.push(`/users/posts/${post.data[0].userId}`);
  };

  const answerFeedback = () => {
    axios.post(`${url}/feedbacks`, { postId: id, content: feedback }).then((result) => {
      editorFunction.setData('<p></p>');
      return setNewFeed(result.data.data);
    });
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSetData = (event, editor) => {
    editor.setData('');
  };

  const handleSelection = (feedbackId) => {
    axios.post(`${url}/posts/select`, { postId: id, feedbackId: feedbackId }).then((result) => {
      axios.get(`${url}/posts/${id}`).then((data) => setPost(data.data));
    });
  };

  const handleSelectionCancel = (feedbackId) => {
    axios.delete(`${url}/posts/select/${id}`).then((result) => {
      axios.get(`${url}/posts/${id}`).then((data) => setPost(data.data));
    });
  };

  const deletePost = () => {
    axios.delete(`${url}/posts/${post.data[0].id}`).then((result) => {
      setConfirmLoading(true);

      history.push('/');
    });
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <PostDetailBodyStyle>
      {isEdit ? (
        <QuestionPostPage post={post} setIsEdit={setIsEdit} />
      ) : (
        <PostDetailContainer>
          <div className="postInfo">
            <div className="headerSection">
              <div className="titleSection">
                <div className="postTitle">{post.data[0].title}</div>
                <div className="optionButton">
                  {state.userInfo.id === post.data[0].userId ? (
                    //  <span onClick={handleEdit}>Edit</span>
                    <Popover
                      placement="bottom"
                      content={
                        <div className="optionContainer">
                          <DivButtonStyle onClick={handleEdit}>Edit</DivButtonStyle>
                          <DivButtonStyle onClick={openModal}>Delete</DivButtonStyle>
                        </div>
                      }
                      trigger="click">
                      <MoreHorizIcon />
                    </Popover>
                  ) : null}
                </div>
              </div>

              <div className="userInfoSection">
                <Popover
                  placement="bottom"
                  content={
                    <DivButtonStyle onClick={sendUserPosts}>
                      {post.data[0].username}님이 올린 게시물 보기
                    </DivButtonStyle>
                  }
                  trigger="click">
                  <div className="avatar">
                    <Avatar size={40} src={<img src={post.data[0].profileImg} />} />
                  </div>
                  <div className="username">{post.data[0].username}</div>
                </Popover>
                <div className="moment">
                  <Moment fromNow style={{ fontSize: '0.8rem', color: '#686868' }}>
                    {startTime}
                  </Moment>
                </div>
              </div>
            </div>

            <div className="sourceSection">
              <Carousel
                variant="dark"
                interval={null}
                bsPrefix={'carousel sourceContainer'}
                slide={true}
                indicators={false}>
                {post.data.sources.length === 0 ? (
                  <Carousel.Item bsPrefix={'carousel-item sourceItem'}>
                    <Image src="../../imageFile/blankImg.png" alt="" width="100%" height="100%" />
                  </Carousel.Item>
                ) : (
                  post.data.sources.map((el, idx) =>
                    el.type === 'video' ? (
                      <Carousel.Item key={el.id} bsPrefix={'carousel-item sourceItem'}>
                        <div className="player-wrapper">
                          <ReactPlayer
                            url={el.sourceUrl}
                            // url={'https://vimeo.com/243556536'}
                            // url={'https://www.youtube.com/watch?v=arbbhHyRP90'}
                            // url={'https://www.youtube.com/watch?v=jy_UiIQn_d0&list=PLmxVF8ick5cSdoEdME6wEjJDLs4XWSV2Z'}
                            className="react-player"
                            controls={true}
                            width="400px"
                            height="300px"
                          />
                        </div>
                      </Carousel.Item>
                    ) : (
                      <Carousel.Item key={el.id} bsPrefix={'carousel-item sourceItem'}>
                        <Image src={el.sourceUrl} alt="" width="100%" height="100%" />
                      </Carousel.Item>
                    ),
                  )
                )}
              </Carousel>
            </div>
            <div className="contentSection">{parse(post.data[0].content)}</div>

            {/* </Carousel> */}
            <div className="feedbackSection">
              {post.data.feedbacks.length === 0 ? (
                <Result icon={<SmileOutlined />} title="아직 등록된 답변이 없습니다." />
              ) : (
                <div className="feedbackContainer">
                  <div className="feedbackHeader">{post.data.feedbacks.length} 개의 등록된 답변이 있습니다</div>
                  <div className="feedbackList">
                    {currentPageList.map((el) => {
                      return (
                        <FeedbackContainer
                          adviser={el}
                          postUserId={post.data[0].userId}
                          isSelected={post.data[0].selected === el.id}
                          key={el.id}
                          getDetailData={getDetailData}
                          checkSelect={setCheckSelect}
                          handleSelection={() => handleSelection(el.id)}
                          handleSelectionCancel={() => handleSelectionCancel(el.id)}
                          setIsReply={setIsReply}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="pagination">
                <Pagination
                  simple
                  defaultCurrent={1}
                  current={currentPage}
                  pageSize={PAGE_SIZE}
                  onChange={handlePageChange}
                  total={post.data.feedbacks.length || 1}
                />
              </div>
              <div className="feedbackEditer">
                {state.userInfo.role === 'adviser' && !isReply ? (
                  <TextEditor text={setFeedback} handleSetData={setEditorFunction} />
                ) : null}
              </div>

              {state.userInfo.role === 'adviser' && !isReply ? (
                <div className="feedbackSubmit" onClick={answerFeedback}>
                  <div className="submitButton">Answer</div>
                </div>
              ) : null}
            </div>
          </div>
        </PostDetailContainer>
      )}

      {/* 모달 */}
      <Modal
        title="Delete Post"
        visible={modal}
        onOk={deletePost}
        confirmLoading={confirmLoading}
        onCancel={closeModal}>
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </PostDetailBodyStyle>
  );
}

export default QuestionDetailPage;
