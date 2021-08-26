import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from '../PostCard';
import { Pagination, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const QuestionContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  .postContainer {
    height: 100%;
    flex: 8;
    margin-top: 20px;
    padding: 0 20px 0 20px;
    display: flex;
    flex-direction: column;
    a {
      color: inherit;
    }
  }
  .pagination {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${(props) => props.theme.mobile} {
      margin-top: 10px;
    }
  }
`;
const BlankStyle = styled.div`
  margin-top: 150px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 30px;
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
    setCurrentPageList(state.searchPosts.slice(0, PAGE_SIZE));
  }, [state.searchPosts]);

  return (
    <QuestionContainerStyle>
      {currentPageList.length ? (
        <>
          <div className="postContainer">
            {currentPageList.map((el) => (
              <Link key={el.id} to={`/posts/${el.id}`} style={{ textDecorationLine: 'none' }}>
                <PostCard data={el} />
              </Link>
            ))}
          </div>
          <div className="pagination">
            <Pagination
              simple
              defaultCurrent={0}
              current={currentPage}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              total={state.searchPosts.length}
            />
          </div>
        </>
      ) : (
        // <Result  icon={<SmileOutlined />} title="요청하신 검색 결과가 없습니다." />
        <BlankStyle>
          <Result icon={<FrownOutlined style={{ fontSize: '100px' }} />} title="요청하신 검색 결과가 없습니다." />
        </BlankStyle>
      )}
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
