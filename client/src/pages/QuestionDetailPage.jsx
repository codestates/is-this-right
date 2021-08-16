import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import { Carousel, Drawer, Avatar } from 'antd';
import axios from 'axios';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import ReactPlayer from 'react-player';
import PostCard from '../components/PostCard';
import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const TextSectionStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5em;
`;

const Editor = styled.div`
  margin-right: 10em;
`;

function QuestionDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userPostsList, setUserPostsList] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get(`${url}/posts/${id}`)
      .then((data) => {
        setPost(data.data);
        return data.data;
      })
      .then((result) =>
        axios
          .get(`${url}/users/posts/${result.data['0'].userId}`)
          .then((data) => setUserPostsList(data.data.data))
          .catch((err) => console.log(err)),
      );
  }, []);

  if (userPostsList === null) {
    return <h1>정보를 받고 있습니다...</h1>;
  } else {
    console.log(post);
    console.log(userPostsList);
  }

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const mockFeedback = [
    {
      id: 5,
      adviserId: 3,
      name: '김병민',
      profileImg: 'img.jpg',
      content: '이걸고치셔야합니다.',
      createdAt: '2021 - 08 - 04',
      updatedAt: '2021 - 08 - 04',
    },
  ];

  return (
    <BodyAreaStyle>
      <ContainerStlye>
        <div>
          <div>{post.data[0].title}</div>
          <div>{post.data[0].username}</div>

          <Avatar
            onClick={showDrawer}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={<img src={post.data[0].profileImg} />}
          />
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
          {mockFeedback.map((el) => {
            return <FeedbackContainer adviser={el} />;
          })}
        </div>

        <Drawer
          title={`${post.data[0].username}님이 올린 게시물`}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={'50%'}>
          {userPostsList.map((el) => {
            return (
              <Link to={`/posts/${el.id}`}>
                <PostCard data={el} />
              </Link>
            );
          })}
        </Drawer>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
