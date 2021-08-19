import React from 'react';
import styled from 'styled-components';

const CategoryStyle = styled.div`
  width: 25%;
  /* background-color: ${(prop) => prop.prop}; */
  flex: 1 1 auto;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > img {
    @media ${(props) => props.theme.mobile} {
      width: 50px;
    }
  }
`;

function CategoryButton({ props }) {
  console.log(props.icon);
  return (
    <CategoryStyle prop={props.color}>
      <img src={props.icon} alt="" />
      <div>{props.name}</div>
    </CategoryStyle>
  );
}

export default CategoryButton;
