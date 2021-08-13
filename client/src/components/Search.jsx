import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const SearchStyle = styled.div`
  width: 100%;
`;

function Search() {
  return (
    <>
      <Input.Search size="large" placeholder="input here" enterButton />
    </>
  );
}

export default Search;
