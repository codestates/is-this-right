import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostCard from '../PostCard';

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
  const [myPostList, setMyPostList] = useState(null);
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    axios.get(`${url}/users/posts/${userInfo.id}`).then((list) => {
      setMyPostList(list.data.data);
    });
    // if (userInfo.role === 'adviser') {
    //   axios.get(`${url}/advisers/${userInfo.userId}`).then((data) => setAdviserDetailInfo(data.data));
    // }
  }, []);

  if (myPostList === null) {
    return '데이터를 받아오고 있습니다.';
  } else {
    console.log('유저정보', userInfo);
    // console.log('게시글', adviserDetailInfo);
  }
  return (
    <UserPostListCompoStyle>
      <MypostSectionStyle>
        <h2>내가 올린 게시물</h2>
        {myPostList.map((el) => (
          <Link to={`/posts/${el.id}`} style={{ textDecorationLine: 'none' }}>
            <PostCard data={el} />
          </Link>
        ))}
      </MypostSectionStyle>
      {userInfo.role === 'adviser' ? (
        <div>
          <h2>내가 답변한 게시글</h2>
          {myPostList.map((el) => (
            <Link to={`/posts/${el.id}`}>
              <PostCard data={el} />
            </Link>
          ))}
        </div>
      ) : null}
    </UserPostListCompoStyle>
  );
}

export default UserPostListCompo;
