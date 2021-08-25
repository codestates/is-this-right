import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopAdvisers } from '../../actions/adviserActionIndex';
import { getCategoryPosts, saveCategory } from '../../actions/postActionIndex';
import styled from 'styled-components';

const CategoryStyle = styled.div`
  width: 25%;
  background-color: ${(prop) => prop.color};
  flex: 1 1 auto;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 10vw;
  font-family: 'font-css';
  color: white;
  @media ${(props) => props.theme.mobile} {
    height: 120px;
    font-size: 0rem;
  }
  box-shadow: 0 0 2px rgba(35, 35, 35, 0.3);
  &.currentCategory {
    font-size: 1.2rem;
    border: 3px dashed #eee;
    @media ${(props) => props.theme.mobile} {
      font-size: 0rem;
    }
    > img {
      /* height: 100px;
      width: 100px; */
      height: 6vw;
      width: 6vw;
      @media ${(props) => props.theme.mobile} {
        width: 70px;
        height: 70px;
      }
    }
  }
  > img {
    /* height: 80px;
    width: 80px; */

    height: 5vw;
    width: 5vw;
    @media ${(props) => props.theme.mobile} {
      width: 50px;
      height: 50px;
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
      color={props.color}>
      <img src={props.icon} alt="" />

      <div className="name">{props.name}</div>
    </CategoryStyle>
  );
}

export default CategoryButton;
