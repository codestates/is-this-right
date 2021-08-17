import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import PostCard from '../components/PostCard';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function UserQuestionPage() {
  const [userPosts, setUserPosts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${url}/users/posts/${id}`).then((result) => setUserPosts(result.data.data));
  }, []);

  if (userPosts === null) {
    return '데이터를 받아오고 있습니다.';
  } else {
    console.log(userPosts);
  }

  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ margin: '0 10% 0 10%' }}>
        <h1>내가 작성한 게시물</h1>
        {userPosts.map((el) => (
          <Link to={`/posts/${el.id}`}>
            <PostCard data={el} />
          </Link>
        ))}
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default UserQuestionPage;
