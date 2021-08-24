import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopAdvisers } from '../../actions/adviserActionIndex';
import { getCategoryPosts, saveCategory } from '../../actions/postActionIndex';
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
  &.currentCategory {
    border: 1px solid #1890ff;
  }
  > img {
    @media ${(props) => props.theme.mobile} {
      width: 50px;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

function CategoryButton({ props, setOnUnanswer, setOnAnswer, viewRadio }) {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.postReducer);
  const handleCategory = () => {
    viewRadio();
    dispatch(getTopAdvisers(props.search));
    dispatch(saveCategory(props.search));
    let data = postState.posts.filter((el) => el.category === props.search);
    dispatch(getCategoryPosts(data));
    setOnUnanswer(false);
    setOnAnswer(false);
  };

  return (
    <CategoryStyle
      className={props.search === postState.currentCategory ? 'currentCategory' : null}
      onClick={handleCategory}
      prop={props.color}>
      <img src={props.icon} alt="" />
      <div>{props.name}</div>
    </CategoryStyle>
  );
}

export default CategoryButton;
