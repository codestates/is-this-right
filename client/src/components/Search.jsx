import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const SearchStyle = styled.div`
  width: 100%;
`;

function Search({ originalList, setAdviserDetail }) {
  const getSearch = (value, e) => {
    console.log(originalList);
    if (!value) return setAdviserDetail(originalList);
    let data = originalList.filter((el) => el.name.includes(value) || el.category === value || el.state === value);
    setAdviserDetail(data);
  };
  return (
    <>
      <Input.Search size="large" placeholder="input here" enterButton onSearch={getSearch} />
    </>
  );
}

export default Search;
