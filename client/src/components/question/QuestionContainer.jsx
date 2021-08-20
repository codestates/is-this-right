import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from '../PostCard';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuestionContainerStyle = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  @media ${(props) => props.theme.mobile} {
    min-height: auto;
  }
`;

function QuestionContainer() {
  const state = useSelector((state) => state.postReducer);
  const PAGE_SIZE = 5;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentPageList(state.searchPosts.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
  };
  useEffect(() => {
    setCurrentPage(1);
    setCurrentPageList(state.searchPosts.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
  }, [state.searchPosts]);

  return (
    <QuestionContainerStyle>
      {currentPageList.map((el) => (
        <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
          <PostCard data={el} />
        </Link>
      ))}
      <Pagination
        simple
        defaultCurrent={0}
        current={currentPage}
        pageSize={PAGE_SIZE}
        onChange={handlePageChange}
        total={state.searchPosts.length}
      />
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
