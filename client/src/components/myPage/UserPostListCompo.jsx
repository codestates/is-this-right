import React from 'react';
import styled from 'styled-components';
import PostCard from '../PostCard';

const UserPostListCompoStyle = styled.div`
  width: 100%;
  height: 85%;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UserPostListCompo() {
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
  ];
  return (
    <UserPostListCompoStyle>
      <div>내가 올린 게시물</div>
      <hr></hr>
      {mockData.map((el) => (
        <PostCard data={el} />
      ))}
    </UserPostListCompoStyle>
  );
}

export default UserPostListCompo;
