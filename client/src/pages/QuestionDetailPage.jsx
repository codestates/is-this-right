import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Avatar, Popover, Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import ReactPlayer from 'react-player';
import Moment from 'react-moment';
import 'moment/locale/ko';

import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ContentStyle = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 10px;
  padding-bottom: 30px;
`;

function QuestionDetailPage() {
  const state = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newFeed, setNewFeed] = useState('');
  const [editorFunction, setEditorFunction] = useState({ setData: () => {} });

  const history = useHistory();
  const nowTime = Date.now();
  let startTime;

  useEffect(() => {
    getDetailData();
  }, [newFeed]);

  const getDetailData = () => {
    axios.get(`${url}/posts/${id}`).then((data) => setPost(data.data));
  };

  if (post === null) {
    return <h1>정보를 받고 있습니다...</h1>;
  } else {
    console.log(post.data);
    startTime = new Date(post.data[0].createdAt);
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

  const handleSetData = (event, editor) => {
    editor.setData('');
  };

  return (
    <BodyAreaStyle>
      <ContainerStlye>
        <h1 style={{ marginTop: '5%' }}>{post.data[0].title}</h1>

        <ContentStyle>
          <div>
            <Popover
              placement="bottom"
              content={<Button onClick={sendUserPosts}>{post.data[0].username}님이 올린 게시물 보기</Button>}
              trigger="click">
              <Avatar size="large" src={<img src={post.data[0].profileImg} />} />
            </Popover>
            <span style={{ margin: '0 5px 0 5px' }}>{post.data[0].username}</span>
            <Moment fromNow style={{ fontSize: '0.8rem', color: '#686868' }}>
              {startTime}
            </Moment>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Carousel variant="dark" interval={null} style={{ width: '400px' }}>
              {post.data.sources.length === 0
                ? null
                : post.data.sources.map((el, idx) =>
                    el.type === 'video' ? (
                      <Carousel.Item style={{ height: '400px', width: '400px' }}>
                        <ReactPlayer
                          className="d-block w-100"
                          src={el.sourceUrl}
                          alt=""
                          key={idx}
                          style={{ height: '400px', width: '400px' }}
                        />
                      </Carousel.Item>
                    ) : (
                      <Carousel.Item style={{ height: '400px', width: '400px' }}>
                        <img
                          className="d-block w-100"
                          src={el.sourceUrl}
                          alt=""
                          key={idx}
                          style={{ height: '400px', width: '400px' }}
                        />
                      </Carousel.Item>
                    ),
                  )}
            </Carousel>
          </div>

          {/* </Carousel> */}
          <div>{post.data[0].content}</div>
        </ContentStyle>
        <div>
          {post.data.feedbacks.length === 0 ? (
            <Result icon={<SmileOutlined />} title="아직 등록된 답변이 없습니다." />
          ) : (
            <>
              <h2 style={{ margin: '5% 0px 5% 0px' }}>{post.data.feedbacks.length}suggested answers</h2>
              {post.data.feedbacks.map((el) => {
                if (post.data[0].selected === el.id) {
                  return (
                    <FeedbackContainer
                      adviser={el}
                      postUserId={post.data[0].userId}
                      isSelected={true}
                      key={el.id}
                      getDetailData={getDetailData}
                    />
                  );
                }
                return (
                  <FeedbackContainer
                    adviser={el}
                    postUserId={post.data[0].userId}
                    isSelected={false}
                    key={el.id}
                    getDetailData={getDetailData}
                  />
                );
              })}
            </>
          )}
        </div>
        <div>
          {state.userInfo.role === 'adviser' ? (
            <TextEditor text={setFeedback} handleSetData={setEditorFunction} />
          ) : null}
        </div>
        {state.userInfo.role === 'adviser' ? <Button onClick={answerFeedback}>Answer</Button> : null}
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
