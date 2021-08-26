import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, filterPosts } from '../actions/postActionIndex';
const SearchStyle = styled.div`
  width: 100%;
`;

function Search({ type, setOnUnanswer, setOnAnswer, getfilterData, inputRef, viewRadio }) {
  const state = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const getAdviserSearch = (value, e) => {
    getfilterData();
  };

  const getQuestionSearch = (value, e) => {
    viewRadio();
    setOnUnanswer(false);
    setOnAnswer(false);
    if (value) {
      let filterData = state.filterPosts.filter((el) => el.title.includes(value) || el.username.includes(value));
      dispatch(searchPosts(filterData));
      // dispatch(filterPosts(filterData));
    } else {
      dispatch(searchPosts(state.categoryPosts));
      dispatch(filterPosts(state.categoryPosts));
    }
  };
  return (
    <>
      <Input.Search
        ref={inputRef}
        size="large"
        placeholder="Search.."
        enterButton
        onSearch={type === 'adviserList' ? getAdviserSearch : getQuestionSearch}
      />
    </>
  );
}

export default Search;
