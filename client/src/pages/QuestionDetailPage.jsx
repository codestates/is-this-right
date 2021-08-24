import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Avatar, Popover, Button, Result, Pagination, Spin, Modal } from 'antd';
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

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ContainerStlyeRes = styled(ContainerStlye)`
  margin-bottom: 50px;

  @media ${(props) => props.theme.mobile} {
    padding: 30px;
    margin-bottom: 150px;
  }
`;

const ContentStyle = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 10px;
  padding-bottom: 30px;
  padding: 30px;
`;

const CarouselStyle = styled(Carousel)`
  .sc-EZqKI iZSpkw carousel slide carousel-dark {
    position: relative;
  }
  .carousel-control-next {
    height: 50px;
    position: absolute;
    right: -15%;
    margin-top: 50%;
  }
  .carousel-control-prev {
    height: 50px;
    position: absolute;
    left: -15%;
    margin-top: 50%;
  }
`;

const DivButtonStyle = styled.div`
  margin: 2px;
  transition: all 0.3s;
  :hover {
    cursor: pointer;
    color: #40a9ff;
  }
`;

const ButtonStyle = styled(Button)`
  width: 30%;
  height: 3%;
  margin-top: 20px;
  font-size: 24px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const CenterComponentsStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
    <BodyAreaStyle>
      <ContainerStlyeRes>
        {isEdit ? (
          <QuestionPostPage post={post} setIsEdit={setIsEdit} />
        ) : (
          <>
            <h1 style={{ marginTop: '5%', marginBottom: '20px' }}>{post.data[0].title}</h1>
            <ContentStyle>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Popover
                    placement="bottom"
                    content={
                      <DivButtonStyle onClick={sendUserPosts}>
                        {post.data[0].username}님이 올린 게시물 보기
                      </DivButtonStyle>
                    }
                    trigger="click">
                    <Avatar size="large" src={<img src={post.data[0].profileImg} />} />
                  </Popover>
                  <span style={{ margin: '0 5px 0 5px' }}>{post.data[0].username}</span>
                  <Moment fromNow style={{ fontSize: '0.8rem', color: '#686868' }}>
                    {startTime}
                  </Moment>
                </div>
                {state.userInfo.id === post.data[0].userId ? (
                  //  <span onClick={handleEdit}>Edit</span>
                  <Popover
                    placement="bottom"
                    content={
                      <div>
                        <DivButtonStyle onClick={handleEdit}>Edit</DivButtonStyle>
                        <DivButtonStyle onClick={openModal}>Delete</DivButtonStyle>
                      </div>
                    }
                    trigger="click">
                    <MoreHorizIcon />
                  </Popover>
                ) : null}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CarouselStyle variant="dark" interval={null} style={{ width: '400px' }} indicators={false}>
                  {post.data.sources.length === 0 ? (
                    <Carousel.Item style={{ height: '400px', width: '400px' }}>
                      <img src="../../imageFile/blankImg.png" alt="" style={{ height: '400px', width: '400px' }} />
                    </Carousel.Item>
                  ) : (
                    post.data.sources.map((el, idx) =>
                      el.type === 'video' ? (
                        <Carousel.Item key={el.id} style={{ height: '400px', width: '400px' }}>
                          <ReactPlayer
                            className="d-block w-100"
                            url={el.sourceUrl}
                            alt=""
                            key={idx}
                            style={{ height: '400px', width: '400px' }}
                            controls={true}
                          />
                        </Carousel.Item>
                      ) : (
                        <Carousel.Item key={el.id} style={{ height: '400px', width: '400px' }}>
                          <img
                            className="d-block w-100"
                            src={el.sourceUrl}
                            alt=""
                            key={idx}
                            style={{ height: '400px', width: '400px' }}
                          />
                        </Carousel.Item>
                      ),
                    )
                  )}
                </CarouselStyle>
              </div>

              {/* </Carousel> */}
              <div style={{ marginTop: '30px' }}>{post.data[0].content}</div>
            </ContentStyle>
          </>
        )}
        <div>
          {post.data.feedbacks.length === 0 ? (
            <Result icon={<SmileOutlined />} title="아직 등록된 답변이 없습니다." />
          ) : (
            <>
              <h2 style={{ margin: '5% 0px 5% 0px' }}>{post.data.feedbacks.length} suggested feedbacks</h2>
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
            </>
          )}
          <CenterComponentsStyle style={{ margin: '20px 0px 20px 0px' }}>
            <Pagination
              simple
              defaultCurrent={1}
              current={currentPage}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              total={post.data.feedbacks.length || 1}
            />
          </CenterComponentsStyle>
        </div>
        <div>
          {state.userInfo.role === 'adviser' && !isReply ? (
            <TextEditor text={setFeedback} handleSetData={setEditorFunction} />
          ) : null}
        </div>
        {state.userInfo.role === 'adviser' && !isReply ? (
          <CenterComponentsStyle>
            <ButtonStyle type="primary" onClick={answerFeedback}>
              Answer
            </ButtonStyle>
          </CenterComponentsStyle>
        ) : null}
        {/* 모달 */}
        <Modal
          title="Delete Post"
          visible={modal}
          onOk={deletePost}
          confirmLoading={confirmLoading}
          onCancel={closeModal}>
          <p>정말 삭제하시겠습니까?</p>
        </Modal>
      </ContainerStlyeRes>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
