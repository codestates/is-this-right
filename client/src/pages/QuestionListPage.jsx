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
import { getTopAdvisers } from '../actions/adviserActionIndex';
import { setIsChat, setViewChatlist, changeRoom, setMessages } from '../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
const QuestionBodyStyle = styled(BodyAreaStyle)`
  background: #f4f4f4;
`;
const QuestionListContainer = styled(ContainerStlye)`
  display: flex;
  flex-direction: column;
  width: 75vw;

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
  .name {
    font-family: 'font-css';
  }
  .backgroundSection {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px 10px 0 0;
    border: 2px solid #eee;
    border-bottom: 0;
    height: 100%;
    @media ${(props) => props.theme.mobile} {
      border: 0;
    }
  }
  .categorySection {
    display: flex;
    background: #f4f4f4;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .searchSection {
    padding: 20px 20px 15px 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 40% 40% 20%;

    @media ${(props) => props.theme.mobile} {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 160px;
    }
    .search {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-right: 0;
      overflow: hidden;
      .ant-input-search-button {
        display: flex;
        align-items: center;
      }

      @media ${(props) => props.theme.mobile} {
        width: 100%;
        margin-bottom: 20px;
      }
    }
    .answered {
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      .ans {
        display: flex;
        justify-content: center;
        border-radius: 10px 0 0 10px;
        width: 100px;
        height: 100%;
        align-items: center;
      }
      .unAns {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 10px 10px 0;
        height: 100%;
      }
      @media ${(props) => props.theme.mobile} {
        margin-bottom: 10px;
      }
    }
    .post {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-family: 'font-css';
      button {
        width: 100px;
        border-radius: 10px;
        height: 100%;
      }
      @media ${(props) => props.theme.mobile} {
        margin-bottom: 10px;
      }
    }
  }
  .mainSection {
    display: flex;
    width: 100%;
    height: 100%;

    @media ${(props) => props.theme.mobile} {
      flex-direction: column-reverse;
    }
    .top10 {
      flex: 1 1;
      display: flex;
      position: relative;
      justify-content: flex-start;
      align-items: flex-start;
      height: 100%;
      min-width: 300px;
      @media ${(props) => props.theme.mobile} {
        margin-top: 20px;
      }
    }
    .listContainer {
      flex: 2.5 3;
      display: flex;
      position: relative;
      justify-content: flex-start;
      align-items: flex-end;
      width: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      margin-bottom: 12vh;
    }
  }
`;

function QuestionListPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const postState = useSelector((state) => state.postReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const [onAnswer, setOnAnswer] = useState(false);
  const [onUnanswer, setOnUnanswer] = useState(false);
  const [radioValue, setRadioValue] = useState(null);

  const category = [
    {
      name: 'P . T',
      search: '헬스',
      color: '#C0392B', //배경컬러를 바꿔야함
      icon: '../../imageFile/fitness_white.png',
    },
    {
      name: 'Golf',
      search: '골프',
      color: '#D25528',
      icon: '../../imageFile/golf_white.png',
    },
    {
      name: 'Climbing',
      search: '클라이밍',
      color: '#F39D31',
      icon: '../../imageFile/climbing_white.png',
    },
    {
      name: 'E.T.C',
      search: '기타',
      color: '#F1C531',
      icon: '../../imageFile/etc_white.png',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllPosts(postState.currentCategory));
    dispatch(getTopAdvisers(postState.currentCategory));
    setIsLoading(false);
    //챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
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
      viewRadio('Answered');
      if (onUnanswer) {
        filterdata = postState.filterPosts.filter((el) => el.selected);
      } else {
        filterdata = postState.searchPosts.filter((el) => el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnAnswer(true);
    } else {
      viewRadio();
      dispatch(searchPosts(postState.filterPosts));
      setOnAnswer(false);
    }
    setOnUnanswer(false);
  };
  const handleUnAnswerButton = () => {
    if (!onUnanswer) {
      let filterdata;
      viewRadio('Unanswered');
      if (onAnswer) {
        filterdata = postState.filterPosts.filter((el) => !el.selected);
      } else {
        filterdata = postState.searchPosts.filter((el) => !el.selected);
      }
      dispatch(searchPosts(filterdata));
      setOnUnanswer(true);
    } else {
      viewRadio();
      dispatch(searchPosts(postState.filterPosts));
      setOnUnanswer(false);
    }
    setOnAnswer(false);
  };
  const viewRadio = (value = '') => {
    setRadioValue(value);
  };
  return (
    <QuestionBodyStyle>
      <QuestionListContainer>
        <div className="categorySection">
          {category.map((el) => (
            <CategoryButton viewRadio={viewRadio} setOnAnswer={setOnAnswer} setOnUnanswer={setOnUnanswer} props={el} />
          ))}
        </div>
        <div className="backgroundSection">
          <div className="searchSection">
            <div className="search">
              <Search setOnUnanswer={setOnUnanswer} setOnAnswer={setOnAnswer} viewRadio={viewRadio} />
            </div>
            <Radio.Group className="answered" buttonStyle="solid" value={radioValue}>
              <Radio.Button value="Answered" onClick={handleAnswerButton} className="ans">
                Answered
              </Radio.Button>
              <Radio.Button value="Unanswered" onClick={handleUnAnswerButton} className="unAns">
                Unanswered
              </Radio.Button>
            </Radio.Group>
            {/* </span> */}
            <Link className="post" to="/QuestionPost">
              <Button type="primary">물어볼까?</Button>
            </Link>
          </div>

          <div className="mainSection">
            <div className="top10">
              <Top10List />
            </div>
            <div className="listContainer">
              <QuestionContainer />
            </div>
          </div>
        </div>
      </QuestionListContainer>
    </QuestionBodyStyle>
  );
}

export default QuestionListPage;
