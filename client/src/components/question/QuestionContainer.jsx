import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import PostCard from '../PostCard';
import { Pagination, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

const QuestionContainerStyle = styled.div`
  width: 71%;
  height: 100%;
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

const AnsweredSectionStyle = styled.div`
  display: flex;
`;

function QuestionContainer() {
  const state = useSelector((state) => state);
  //state => adviserReducer , postReducer / userReducer

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

      {state.postReducer.posts.map((el) => (
        <Link to={`/posts/${el.id}`}>
          <PostCard data={el} />
        </Link>
      ))}
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
