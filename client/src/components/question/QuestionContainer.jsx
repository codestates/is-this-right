import React from 'react';
import styled from 'styled-components';
import Search from '../Search';
import PostCard from '../PostCard';

const QuestionContainerStyle = styled.div`
  width: 71%;
  height: 100%;
  background-color: skyblue;
`;

const SearchSection = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5% 0px 5%;
`;

const PostCardSectionStyle = styled.div`
  width: 100%;
  height: 90%;
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function QuestionContainer() {
  const mockData = [
    {
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      id: 'PK',
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
      </SearchSection>
      <PostCardSectionStyle>
        {mockData.map((el) => (
          <PostCard data={el} />
        ))}
      </PostCardSectionStyle>
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
