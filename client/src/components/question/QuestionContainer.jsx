import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import PostCard from '../PostCard';
import { Pagination, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

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
  const state = useSelector((state) => state);
  //state => adviserReducer , postReducer / userReducer

  return (
    <QuestionContainerStyle>
      {state.postReducer.posts.map((el) => (
        <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none' }}>
          <PostCard data={el} />
        </Link>
      ))}
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
