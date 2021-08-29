import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../components/PostCard';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import { LoadingOutlined } from '@ant-design/icons';
import { setViewChatlist, setIsChat, setMessages, changeRoom } from '../actions/chatAction';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const UserPostContainer = styled(ContainerStlye)`
  display: flex;
  margin: '0 10% 0 10%';
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 60vw;
  .name {
    font-family: 'font-css';
  }
  .pageTitle {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    font-size: 1.3rem;
  }
  .userPostList {
    width: 100%;
    display: flex;
    flex-direction: column;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: flex-start;
  }
`;

function UserQuestionPage() {
  const [userPosts, setUserPosts] = useState([]);
  const PAGE_SIZE = 5;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  //pagination states

  const handlePageChange = (page) => {
    if (userPosts) {
      setCurrentPage(page);
      setCurrentPageList(userPosts.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };

  useEffect(() => {
    axios.get(`${url}/users/posts/${id}`).then((result) => setUserPosts(result.data.data.postInfo));
  }, []);

  useEffect(() => {
    if (userPosts) {
      setCurrentPage(1);
      setCurrentPageList(userPosts.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
    //챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
  }, [userPosts]);

  if (userPosts === null) {
    return '데이터를 받아오고 있습니다.';
  } else {
    console.log(userPosts);
  }
  return (
    <BodyAreaStyle>
      <UserPostContainer>
        <div className="pageTitle">
          <span className="name">{currentPageList.length ? currentPageList[0].username : <LoadingOutlined />}</span>님이
          작성한 게시물
        </div>
        <div className="userPostList">
          {currentPageList.map((el) => (
            <Link to={`/posts/${el.id}`}>
              <PostCard data={el} />
            </Link>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPage}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            total={userPosts.length || 1}
          />
        </div>
      </UserPostContainer>
    </BodyAreaStyle>
  );
}

export default UserQuestionPage;
