import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryButton from '../components/question/CategoryButton';
import Top10List from '../components/question/Top10List';
import QuestionContainer from '../components/question/QuestionContainer';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import { useSelector, useDispatch } from 'react-redux';

import { getAllPosts } from '../actions/postActionIndex';
import { StarTwoTone } from '@ant-design/icons';
import { getTopAdvisers } from '../actions/adviserActionIndex';
const url = process.env.REACT_APP_API_URL;

// const BodyAreaStyle = styled.div`
//   height: 80vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
// `;

// const ContainerStlye = styled.div`
//   width: 60%;
//   background-color: black;
// `;
const CategorySection = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  background-color: green;
`;

const ContainerSection = styled.div`
  display: flex;
`;

function QuestionListPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const category = [
    {
      name: '헬스',
      color: 'white', //배경컬러를 바꿔야함
    },
    {
      name: '골프',
      color: 'pink',
    },
    {
      name: '클라이밍',
      color: 'black',
    },
    {
      name: '기타',
      color: 'blue',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllPosts());
    dispatch(getTopAdvisers());
    setIsLoading(false);
  }, []);

  if (isLoading === true) {
    return '데이터를 가져오고있습니다.';
  }

  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ overflow: 'auto', height: 'auto' }}>
        <CategorySection>
          {category.map((el) => (
            <CategoryButton props={el} />
          ))}
        </CategorySection>
        <ContainerSection>
          <Top10List />
          <QuestionContainer />
        </ContainerSection>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionListPage;
