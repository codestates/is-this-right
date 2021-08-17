import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { Carousel, Avatar, Popover, Button } from 'antd';
import axios from 'axios';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import ReactPlayer from 'react-player';

import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function QuestionDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [text, setText] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${url}/posts/${id}`).then((data) => {
      return setPost(data.data);
    });
  }, []);

  if (post === null) {
    return <h1>정보를 받고 있습니다...</h1>;
  }

  const sendUserPosts = () => {
    history.push(`/users/posts/${post.data[0].userId}`);
  };

  return (
    <BodyAreaStyle>
      <ContainerStlye>
        <div>
          <div>{post.data[0].title}</div>
          <div>{post.data[0].username}</div>
          <Popover
            placement="bottom"
            title={text}
            content={<Button onClick={sendUserPosts}>{post.data[0].username}님이 올린 게시물 보기</Button>}
            trigger="click">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={<img src={post.data[0].profileImg} />}
            />
          </Popover>
        </div>
        <div>
          <Carousel>
            {/* 이미지가 안옴 !!  소스가 안옴 프로필 이미지만 옴 */}
            {/* {post.data[0].sources.map((el) => {
              el.type === 'video' ? <ReactPlayer url={el.url} /> : <img src={el.url} />;
            })} */}
          </Carousel>
          <div>{post.data[0].content}</div>
        </div>
        <div>
          <div>Adviser Profile</div>
          <div>Feedback contents</div>
          {/* 마크다운 */}
          <TextEditor />
          {/* 마크다운 */}
        </div>
        <div>
          {post.data.feedbacks.map((el) => {
            return <FeedbackContainer adviser={el} />;
          })}
        </div>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
