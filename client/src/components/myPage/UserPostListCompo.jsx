import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostCard from '../PostCard';
import { Pagination } from 'antd';

const url = process.env.REACT_APP_API_URL;
const UserPostListCompoStyle = styled.div`
  width: 100%;
  height: 85%;
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const MypostSectionStyle = styled.div`
  width: 100%;
  min-height: 300px;
`;

function UserPostListCompo() {
  const [myPostList, setMyPostList] = useState([]);
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);
  const [myFeedbackList, setMyFeedbackList] = useState([]);

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    axios.get(`${url}/users/posts/${userInfo.id}`).then((list) => {
      setMyPostList(list.data.data.postInfo);
      if (list.data.data.feedbackInfo) {
        setMyFeedbackList(list.data.data.feedbackInfo);
      }
    });
    // if (userInfo.role === 'adviser') {
    //   axios.get(`${url}/advisers/${userInfo.userId}`).then((data) => setAdviserDetailInfo(data.data));
    // }
  }, []);


  //Post pagination states
  const POST_PAGE_SIZE = 3;
  const [currentPostPageList, setCurrentPostPageList] = useState([]);
  const [currentPostPage, setCurrentPostPage] = useState(1);

  const handlePostPageChange = (page) => {
    if (myPostList) {
      setCurrentPostPage(page);
      setCurrentPostPageList(myPostList.slice(POST_PAGE_SIZE * (page - 1), POST_PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (myPostList) {
      setCurrentPostPage(1);
      setCurrentPostPageList(
        myPostList.slice(POST_PAGE_SIZE * (currentPostPage - 1), POST_PAGE_SIZE * currentPostPage),
      );
    }
  }, [myPostList]);

  //Feedback pagination states
  const FEEDBACK_PAGE_SIZE = 3;
  const [currentFeedbackPageList, setCurrentFeedbackPageList] = useState([]);
  const [currentFeedbackPage, setCurrentFeedbackPage] = useState(1);

  const handleFeedbackPageChange = (page) => {
    if (myPostList) {
      setCurrentFeedbackPage(page);
      setCurrentFeedbackPageList(myFeedbackList.slice(FEEDBACK_PAGE_SIZE * (page - 1), FEEDBACK_PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (myFeedbackList) {
      setCurrentFeedbackPage(1);
      setCurrentFeedbackPageList(
        myFeedbackList.slice(FEEDBACK_PAGE_SIZE * (currentFeedbackPage - 1), FEEDBACK_PAGE_SIZE * currentFeedbackPage),
      );
    }
  }, [myFeedbackList]);

  if (!myPostList) {
    return <div>로딩중...</div>;
  }
  return (
    <UserPostListCompoStyle>
      <div>내가 올린 게시물</div>
      <hr></hr>
      {currentPostPageList.map((el) => (
        <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
          <PostCard data={el} />
        </Link>
      ))}
      <Pagination
        simple
        defaultCurrent={1}
        current={currentPostPage}
        pageSize={POST_PAGE_SIZE}
        onChange={handlePostPageChange}
        total={myPostList.length}
      />
      <div>내가 답변한 게시물</div>
      <hr></hr>
      {currentFeedbackPageList.map((el) => (
        <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
          <PostCard data={el} />
        </Link>
      ))}
      <Pagination
        simple
        defaultCurrent={1}
        current={currentFeedbackPage}
        pageSize={FEEDBACK_PAGE_SIZE}
        onChange={handleFeedbackPageChange}
        total={myFeedbackList.length}
      />
    </UserPostListCompoStyle>
  );
}

export default UserPostListCompo;
