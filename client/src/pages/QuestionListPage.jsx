import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryButton from '../components/question/CategoryButton';
import Top10List from '../components/question/Top10List';
import QuestionContainer from '../components/question/QuestionContainer';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../components/Search';
import { Button, Radio } from 'antd';
import { Link } from 'react-router-dom';

import { getAllPosts, searchPosts, getCategoryPosts } from '../actions/postActionIndex';
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
  height: 20%;
  /* min-height: 170px;
  min-width: 200px; */
`;

const ContainerSection = styled.div`
  display: flex;
  height: 100%;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column-reverse;
    /* justify-content: center; */
    margin-bottom: 300px;
    align-items: center;
  }
`;

const SearchSection = styled.div`
  /* height: 10%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px 0px;
  > div {
    width: 60%;
  }

  > Radio.Group {
  }

  @media ${(props) => props.theme.mobile} {
    flex-wrap: wrap;
    > div {
      width: 100vw;
    }
  }
`;

const AnsweredSectionStyle = styled.div`
  display: flex;
`;

const RadioGroup = styled(Radio.Group)`
  width: 30% !important;

  @media ${(props) => props.theme.mobile} {
    width: 100% !important;
  }
`;

const RadioButton = styled(Radio.Button)`
  width: 50%;
  font-size: 1rem;
  text-align: center;
`;

const LinkButtonStyle = styled(Link)`
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    > Button {
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }
`;

function QuestionListPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const postState = useSelector((state) => state.postReducer);
  const [onAnswer, setOnAnswer] = useState(false);
  const [onUnanswer, setOnUnanswer] = useState(false);

  const category = [
    {
      name: 'Personal Training',
      search: '헬스',
      color: 'red', //배경컬러를 바꿔야함
      icon: '../../imageFile/fitness.png',
    },
    {
      name: 'Golf',
      search: '골프',
      color: 'pink',
      icon: '../../imageFile/golf.png',
    },
    {
      name: 'Climbing',
      search: '클라이밍',
      color: 'black',
      icon: '../../imageFile/climbing.png',
    },
    {
      name: 'E.T.C',
      search: '기타',
      color: 'blue',
      icon: '../../imageFile/etc.png',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllPosts());
    dispatch(getTopAdvisers());
    let filter = postState.posts.filter((el) => el.category === '헬스');
    console.log(filter);
    dispatch(getCategoryPosts(filter));
    setIsLoading(false);
    console.log('포스트', postState);
  }, []);

  if (isLoading === true) {
    return '데이터를 가져오고있습니다.';
  }

  if (state.logIn) {
    console.log(state);
  }

  //state => adviserReducer , postReducer / userReducertest

  const handleAnswerButton = () => {
    if (!onAnswer) {
      let filterdata;
      if (onUnanswer) {
        filterdata = postState.filterPosts.filter((el) => el.selected);
      } else {
        filterdata = postState.searchPosts.filter((el) => el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnAnswer(true);
    } else {
      dispatch(searchPosts(postState.filterPosts));
      setOnAnswer(false);
    }
    setOnUnanswer(false);
  };
  const handleUnAnswerButton = () => {
    if (!onUnanswer) {
      let filterdata;
      if (onAnswer) {
        filterdata = postState.filterPosts.filter((el) => !el.selected);
      } else {
        filterdata = postState.searchPosts.filter((el) => !el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnUnanswer(true);
    } else {
      dispatch(searchPosts(postState.filterPosts));
      setOnUnanswer(false);
    }
    setOnAnswer(false);
  };

  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ display: 'flex', flexDirection: 'column' }}>
        <CategorySection>
          {category.map((el) => (
            <CategoryButton setOnAnswer={setOnAnswer} setOnUnanswer={setOnUnanswer} props={el} />
          ))}
        </CategorySection>

        <SearchSection>
          <div>
            <Search setOnUnanswer={setOnUnanswer} setOnAnswer={setOnAnswer} />
          </div>
          {/* <span> */}
          <RadioGroup buttonStyle="solid">
            <AnsweredSectionStyle>
              <RadioButton
                value="Answered"
                onClick={handleAnswerButton}
                style={{ borderRadius: '10px 0px 0px 10px', borderRight: '0px' }}>
                Answered
              </RadioButton>
              <RadioButton
                value="Unanswered"
                onClick={handleUnAnswerButton}
                style={{ borderRadius: '0 10px 10px 0', borderLeft: '0px' }}>
                Unanswered
              </RadioButton>
            </AnsweredSectionStyle>
          </RadioGroup>
          {/* </span> */}
          <LinkButtonStyle to="/QuestionPost">
            <Button>New Question</Button>
          </LinkButtonStyle>
        </SearchSection>

        <ContainerSection>
          <Top10List />
          <QuestionContainer />
        </ContainerSection>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionListPage;
