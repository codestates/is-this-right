import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostCard from '../PostCard';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;
const UserPostListCompoStyle = styled.div`
  width: 100%;
  height: 85%;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

function UserPostListCompo() {
  const [myPostList, setMyPostList] = useState([]);
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    axios.get(`${url}/users/posts/${userInfo.id}`).then((list) => {
      setMyPostList(list.data.data);
    });
  }, []);

  //pagination states
  const PAGE_SIZE = 3;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (myPostList) {
      setCurrentPage(page);
      setCurrentPageList(myPostList.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (myPostList) {
      setCurrentPage(1);
      setCurrentPageList(myPostList.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
  }, [myPostList]);

  return (
    <UserPostListCompoStyle>
      <div>내가 올린 게시물</div>
      <hr></hr>
      {currentPageList.map((el) => (
        <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
          <PostCard data={el} />
        </Link>
      ))}

      <Pagination
        simple
        defaultCurrent={1}
        current={currentPage}
        pageSize={PAGE_SIZE}
        onChange={handlePageChange}
        total={myPostList.length}
      />
    </UserPostListCompoStyle>
  );
}

export default UserPostListCompo;
