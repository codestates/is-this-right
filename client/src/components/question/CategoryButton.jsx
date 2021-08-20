import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopAdvisers } from '../../actions/adviserActionIndex';
import { searchPosts, filterPosts, getCategoryPosts } from '../../actions/postActionIndex';
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

function CategoryButton({ props, setOnUnanswer, setOnAnswer }) {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.postReducer);
  const handleCategory = () => {
    console.log('포스트친구들', postState);
    dispatch(getTopAdvisers(props.search));

    let data = postState.posts.filter((el) => el.category === props.search);
    dispatch(getCategoryPosts(data));
    dispatch(searchPosts(data));
    setOnUnanswer(false);
    setOnAnswer(false);
  };

  return (
    <CategoryStyle onClick={handleCategory} prop={props.color}>
      <img src={props.icon} alt="" />
      <div>{props.name}</div>
    </CategoryStyle>
  );
}

export default CategoryButton;
