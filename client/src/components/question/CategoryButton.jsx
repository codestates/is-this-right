import React from 'react';
import styled from 'styled-components';

const CategoryStyle = styled.div`
  width: 25%;
  height: 80%;
  background-color: ${(prop) => prop.prop};
  flex: 1 1 auto;
  border-radius: 10px;
  margin: 10px;
`;

function CategoryButton({ props }) {
  console.log(props.color);
  return (
    <CategoryStyle prop={props.color}>
      <div>{props.name}</div>
    </CategoryStyle>
  );
}

export default CategoryButton;
