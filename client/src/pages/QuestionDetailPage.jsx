import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Avatar, Popover, Button, Pagination } from 'antd';
import axios from 'axios';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import ReactPlayer from 'react-player';
import TextEditor from '../components/textComponent/TextEditor';
import FeedbackContainer from '../components/question/FeedbackContainer';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function QuestionDetailPage() {
  const state = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [newFeed, setNewFeed] = useState('');
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
  }, [post]);

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

  return (
    <BodyAreaStyle>
      <ContainerStlye>
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
        <div>
          <Carousel variant="dark" interval={null}>
            {post.data.sources.length === 0
              ? null
              : post.data.sources.map((el, idx) =>
                  el.type === 'video' ? (
                    <Carousel.Item>
                      <ReactPlayer className="d-block w-100" src={el.sourceUrl} alt="" key={idx} />
                    </Carousel.Item>
                  ) : (
                    <Carousel.Item>
                      <img className="d-block w-100" src={el.sourceUrl} alt="" key={idx} />
                    </Carousel.Item>
                  ),
                )}
          </Carousel>
          {/* </Carousel> */}
          <div>{post.data[0].content}</div>
        </div>
        <div>
          {post.data.feedbacks.length === 0 ? (
            <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
          ) : (
            currentPageList.map((el) => {
              return <FeedbackContainer adviser={el} key={el.id} />;
            })
          )}
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPage}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            total={post.data.feedbacks.length}
          />
        </div>
        <div>{state.userInfo.role === 'adviser' ? <TextEditor text={setFeedback} /> : null}</div>
        <Button onClick={answerFeedback}>Answer</Button>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionDetailPage;
