import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, filterPosts } from '../actions/postActionIndex';
const SearchStyle = styled.div`
  width: 100%;
`;

function Search({ originalList, setAdviserDetail, type, setOnUnanswer, setOnAnswer, setOnSerach, setSearchList }) {
  const state = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const getAdviserSearch = (value, e) => {
    console.log(originalList);
    if (!value) {
      setOnSerach(false);
      setAdviserDetail(originalList);
      setSearchList(originalList);
      return;
    }
    let data = originalList.filter((el) => el.name.includes(value) || el.category === value || el.state === value);
    setOnSerach(true);
    setAdviserDetail(data);
    setSearchList(data);
  };

  const getQuestionSearch = (value, e) => {
    setOnUnanswer(false);
    setOnAnswer(false);
    if (value) {
      let filterData = state.posts.filter((el) => el.title.includes(value) || el.username.includes(value));
      dispatch(searchPosts(filterData));
      dispatch(filterPosts(filterData));
    } else {
      dispatch(searchPosts(state.posts));
      dispatch(filterPosts(state.posts));
    }
  };
  return (
    <>
      <Input.Search
        size="large"
        placeholder="input here"
        enterButton
        onSearch={type === 'adviserList' ? getAdviserSearch : getQuestionSearch}
      />
    </>
  );
}

export default Search;
