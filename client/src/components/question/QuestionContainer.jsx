import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import PostCard from '../PostCard';
import { Pagination, Button } from 'antd';
import { Link } from 'react-router-dom';

const QuestionContainerStyle = styled.div`
  width: 71%;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
`;

const SearchSection = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5% 0px 5%;
`;

const PostCardSectionStyle = styled(Link)`
  width: 100%;
  /* height: 350px; */
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnsweredSectionStyle = styled.div`
  display: flex;
`;

function QuestionContainer() {
  const mockData = [
    {
      id: 1,
      username: '김',
      title: 'ㄱㄷㅎ',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04', //스크링으로 오는지 확인
      updatedAt: '2021-08-04',
    },
    {
      id: 2,
      username: '병민',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 3,
      username: '상훈',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 4,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 5,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 6,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 7,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 8,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
    {
      id: 9,
      username: '상현',
      title: 'title',
      img: 'img',
      category: '헬스',
      commentNum: 4,
      isAnswered: false,
      createdAt: '2021-08-04',
      updatedAt: '2021-08-04',
    },
  ];

  return (
    <QuestionContainerStyle>
      <SearchSection>
        <Search />
        <AnsweredSectionStyle>
          <Button>Answered</Button>
          <Button>Unanswered</Button>
        </AnsweredSectionStyle>
        <Link to="/QuestionPost">
          <Button>게시</Button>
        </Link>
      </SearchSection>
      {/* <PostCardSectionStyle> */}
      {mockData.map((el) => (
        <PostCardSectionStyle to={`/posts/${el.id}`}>
          <PostCard data={el} />
        </PostCardSectionStyle>
      ))}
      {/* </PostCardSectionStyle> */}
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
