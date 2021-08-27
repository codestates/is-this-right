import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MypostCard from './MypostCard';
import MyFeedbackCard from './MyFeedbackCard';
import { Pagination, Spin, Divider, Result } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const url = process.env.REACT_APP_API_URL;

const UserPostListBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .divider {
    border-top: 1px dashed #ddd;
  }
  .section {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .label {
      width: 100%;
      display: flex;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .listContainer {
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
      .listWrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 30px;
        @media ${(props) => props.theme.mobile} {
          flex-direction: column;
          padding-left: 3vw;
          padding-right: 3vw;
          width: 100%;
        }
      }
      .userListWrapper {
        display: grid;
        width: 100%;
        gap: 30px;
        grid-template-columns: 1fr 1fr 1fr;
        @media ${(props) => props.theme.mobile} {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .pagination {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;
const UserView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const AdviserView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
      setCurrentPostPageList(myPostList.slice(0, POST_PAGE_SIZE));
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
    <UserPostListBody>
      {userInfo.role === 'user' ? (
        <UserView>
          <div className="section">
            <div className="label">내가 올린 질문</div>
            <div className="listContainer">
              {currentPostPageList.length ? (
                <div className="userListWrapper">
                  {currentPostPageList.map((el) => (
                    <Link className="link" to={`/posts/${el.id}`} style={{ textDecorationLine: 'none' }}>
                      <MypostCard data={el} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Result icon={<SmileOutlined style={{ fontSize: '100px' }} />} title="내가 작성한 게시물이 없습니다." />
              )}
            </div>
            <div className="pagination">
              {currentPostPageList.length ? (
                <Pagination
                  simple
                  defaultCurrent={1}
                  current={currentPostPage}
                  pageSize={POST_PAGE_SIZE}
                  onChange={handlePostPageChange}
                  total={myPostList.length}
                />
              ) : null}
            </div>
          </div>
        </UserView>
      ) : (
        <AdviserView>
          <div className="section">
            <div className="label">내가 올린 질문</div>
            <div className="listContainer">
              {currentPostPageList.length ? (
                <div className="listWrapper">
                  {currentPostPageList.map((el) => (
                    <Link className="link" to={`/posts/${el.id}`} style={{ textDecorationLine: 'none' }}>
                      <MypostCard data={el} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Result icon={<SmileOutlined style={{ fontSize: '100px' }} />} title="내가 작성한 게시물이 없습니다." />
              )}
            </div>
            <div className="pagination">
              {currentPostPageList.length ? (
                <Pagination
                  simple
                  defaultCurrent={1}
                  current={currentPostPage}
                  pageSize={POST_PAGE_SIZE}
                  onChange={handlePostPageChange}
                  total={myPostList.length}
                />
              ) : null}
            </div>
          </div>
          <div className="section divider">
            <div className="label">내가 쓴 답변</div>
            <div className="listContainer">
              {currentFeedbackPageList.length ? (
                <div className="listWrapper">
                  {currentFeedbackPageList.map((el) => (
                    <Link className="link" to={`/posts/${el.postId}`} style={{ textDecorationLine: 'none' }}>
                      <MyFeedbackCard data={el} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Result icon={<SmileOutlined style={{ fontSize: '100px' }} />} title="내가 답변한 게시물이 없습니다." />
              )}
            </div>
            <div className="pagination">
              {myFeedbackList.length ? (
                <Pagination
                  simple
                  defaultCurrent={1}
                  current={currentFeedbackPage}
                  pageSize={FEEDBACK_PAGE_SIZE}
                  onChange={handleFeedbackPageChange}
                  total={myFeedbackList.length}
                />
              ) : null}
            </div>
          </div>
        </AdviserView>
      )}
    </UserPostListBody>
  );
}

export default UserPostListCompo;
