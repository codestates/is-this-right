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
import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
import QuestionPostPage from './QuestionPostPage';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function QuestionDetailPage() {
  const state = useSelector((state) => state.userReducer);
  console.log('스테이트', state);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newFeed, setNewFeed] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${url}/posts/${id}`).then((data) => setPost(data.data));
  }, [newFeed]);

  if (post === null) {
    return <h1>정보를 받고 있습니다...</h1>;
  } else {
    console.log(post.data);
  }

  const sendUserPosts = () => {
    history.push(`/users/posts/${post.data[0].userId}`);
  };

  const answerFeedback = () => {
    axios.post(`${url}/feedbacks`, { postId: id, content: feedback }).then((result) => {
      return setNewFeed(result.data.data);
    });
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <BodyAreaStyle>
      <ContainerStlye>
        {isEdit ? (
          <QuestionPostPage post={post} setIsEdit={setIsEdit} />
        ) : (
          <>
            <div>
              <div>{post.data[0].title}</div>
              <div>{post.data[0].username}</div>
              <Popover
                placement="bottom"
                content={<Button onClick={sendUserPosts}>{post.data[0].username}님이 올린 게시물 보기</Button>}
                trigger="click">
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={<img src={post.data[0].profileImg} />}
                />
              </Popover>
            </div>
            {state.userInfo.id === post.data[0].userId ? <button onClick={handleEdit}>수정하기</button> : null}
            <div>
              <Carousel variant="dark" interval={null}>
                {post.data.sources.length === 0
                  ? null
                  : post.data.sources.map((el, idx) =>
                      el.type === 'video' ? (
                        <Carousel.Item>
                          <ReactPlayer
                            className="d-block w-100"
                            url={el.sourceUrl}
                            alt=""
                            key={idx}
                            style={{ height: '400px' }}
                            controls={true}
                          />
                        </Carousel.Item>
                      ) : (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={el.sourceUrl}
                            alt=""
                            key={idx}
                            style={{ height: '400px' }}
                          />
                        </Carousel.Item>
                      ),
                    )}
              </Carousel>
              {/* </Carousel> */}
              <div>{post.data[0].content}</div>
            </div>
          </>
        )}
        <div>
          {post.data.feedbacks.length === 0 ? (
            <Result icon={<SmileOutlined />} title="아직 등록된 답변이 없습니다." />
          ) : (
            post.data.feedbacks.map((el) => {
              return <FeedbackContainer adviser={el} key={el.id} />;
            })
          )}
        </div>
        <div>{state.userInfo.role === 'adviser' ? <TextEditor text={setFeedback} /> : null}</div>
        <Button onClick={answerFeedback}>Answer</Button>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
