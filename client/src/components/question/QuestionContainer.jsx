import React, { useState } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import PostCard from '../PostCard';
import { Pagination, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../actions/postActionIndex';

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
  const state = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const [onAnswer, setOnAnswer] = useState(false);
  const [onUnanswer, setOnUnanswer] = useState(false);

  //state => adviserReducer , postReducer / userReducertest

  const handleAnswerButton = () => {
    if (!onAnswer) {
      let filterdata;
      if (onUnanswer) {
        filterdata = state.filterPosts.filter((el) => el.selected);
      } else {
        filterdata = state.searchPosts.filter((el) => el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnAnswer(true);
    } else {
      dispatch(searchPosts(state.filterPosts));
      setOnAnswer(false);
    }
    setOnUnanswer(false);
  };
  const handleUnAnswerButton = () => {
    if (!onUnanswer) {
      let filterdata;
      if (onAnswer) {
        filterdata = state.filterPosts.filter((el) => !el.selected);
      } else {
        filterdata = state.searchPosts.filter((el) => !el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnUnanswer(true);
    } else {
      dispatch(searchPosts(state.filterPosts));
      setOnUnanswer(false);
    }
    setOnAnswer(false);
  };
  return (
    <QuestionContainerStyle>
      <SearchSection>
        <Search setOnUnanswer={setOnUnanswer} setOnAnswer={setOnAnswer} />
        <AnsweredSectionStyle>
          <Button onClick={handleAnswerButton}>Answered</Button>
          <Button onClick={handleUnAnswerButton}>Unanswered</Button>
        </AnsweredSectionStyle>
        <Link to="/QuestionPost">
          <Button>게시</Button>
        </Link>
      </SearchSection>
      {state.searchPosts.map((el) => (
        <Link to={`/posts/${el.id}`}>
          <PostCard data={el} />
        </Link>
      ))}
    </QuestionContainerStyle>
  );
}

export default QuestionContainer;
