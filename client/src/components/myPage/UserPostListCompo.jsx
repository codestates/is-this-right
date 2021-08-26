import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MypostCard from './MypostCard';
import MyFeedbackCard from './MyFeedbackCard';
import { Pagination, Spin, Divider } from 'antd';

const url = process.env.REACT_APP_API_URL;

const UserPostListCompoStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: table;
`;

const SectionStyle = styled.div`
  height: ${(props) => (props.role === 'user' ? '100%' : '50%')};
  position: relative;
  display: table-row;
  padding: 20px;
`;

const MypostSectionStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0px 20px 0px;
  padding-left: ${(props) => (props.role === 'user' ? '10%' : '0px')};
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
  }
  @media ${(props) => props.theme.avatar} {
    justify-content: center;
    padding-left: 0px;
  }
`;

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
`;

function UserPostListCompo() {
  const [myPostList, setMyPostList] = useState([]);
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);
  const [myFeedbackList, setMyFeedbackList] = useState([]);

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    axios.get(`${url}/users/posts/${userInfo.id}`).then((list) => {
      console.log(list);
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
  const POST_PAGE_SIZE = userInfo.role === 'user' ? 6 : 3;
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
    return (
      <div>
        <Spin size={500} tip="데이터를 받아오고 있습니다."></Spin>
      </div>
    );
  }

  return (
    <UserPostListCompoStyle>
      <SectionStyle role={userInfo.role}>
        <div style={{ textAlign: 'center' }}>내가 올린 게시물</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MypostSectionStyle role={userInfo.role}>
            {currentPostPageList.map((el) => (
              <MypostCard data={el} />
            ))}
          </MypostSectionStyle>
        </div>
        <PaginationStyle>
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPostPage}
            pageSize={POST_PAGE_SIZE}
            onChange={handlePostPageChange}
            total={myPostList.length}
          />
        </PaginationStyle>
      </SectionStyle>
      <Divider />
      {userInfo.role === 'adviser' ? (
        <SectionStyle>
          <h2 style={{ textAlign: 'center' }}>내가 답변한 게시물</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MypostSectionStyle>
              {currentFeedbackPageList.map((el) => (
                // <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
                <MyFeedbackCard data={el} />
                // </Link>
              ))}
            </MypostSectionStyle>
          </div>
          <PaginationStyle>
            <Pagination
              simple
              defaultCurrent={1}
              current={currentFeedbackPage}
              pageSize={FEEDBACK_PAGE_SIZE}
              onChange={handleFeedbackPageChange}
              total={myFeedbackList.length}
            />
          </PaginationStyle>
        </SectionStyle>
      ) : null}
    </UserPostListCompoStyle>
  );
}

export default UserPostListCompo;
