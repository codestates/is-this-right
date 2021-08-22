import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AdviserCard from '../components/adviser/AdviserCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Radio, Pagination, Button } from 'antd';
import Search from '../components/Search';
import { setIsChat, setMessages, setViewChatlist, changeRoom } from '../actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const SearchAndFilterStyle = styled.div`
  border: 1px solid #dddddd;
  margin: 20px;
  margin-top: 30px;
  display: flex;
  width: 300px;
  flex-direction: column;
  padding: 10px;
  /* flex-wrap: wrap; */
  > div {
    margin-top: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;

    > input {
      width: 100%;
    }
  }
`;

const FilterStyle = styled.div`
  /* background-color: red; */
  height: 100%;
  width: 100%;
  .title {
    margin-top: 10px;
  }
  .filterCategory {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .filterCategory > label {
    width: 46%;
    margin: 2%;
    font-size: 0.9rem;
    text-align: center;
    &.all {
      width: 100%;
    }
  }
  @media ${(props) => props.theme.mobile} {
    padding-left: 0;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-top: 1px solid #dddddd;
    }
    .title {
      margin-top: 10px;
      width: 10vw;
    }
    .filterCategory {
      display: flex;
      justify-content: flex-start;
      width: 100%;
    }
    .filterCategory > label {
      width: auto;
      font-size: 0.9rem;
      text-align: center;
      margin: 10px 2px 10px 2px;
      &.all {
        width: auto;
      }
    }
  }
`;
const AdviserSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 150px;
  padding-right: 50px;
  .adviserListContainer {
    width: 100%;
    min-width: 400px;
    /* background-color: green; */
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    padding-left: 0;
    padding-right: 0;
    overflow-x: hidden;
  }
`;
const FilterSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const AdviserBodyAreaStyle = styled(BodyAreaStyle)`
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column-reverse;
    overflow-x: hidden;
  }
`;
const AdviserContainerStyle = styled(ContainerStlye)`
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 15vh;
    width: 100vw;
    overflow-x: hidden;
  }
`;

function AdvisorListPage() {
  const [adviserDetail, setAdviserDetail] = useState(null);
  const [originalList, setOriginalList] = useState([]);
  const [filterOption, setFilterOption] = useState({ category: '전체', gender: '남+여', state: '전국' });
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chatReducer);
  //pagination states
  const PAGE_SIZE = 5;
  const [currentPageList, setCurrentPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    if (adviserDetail) {
      setCurrentPage(page);
      setCurrentPageList(adviserDetail.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
    }
  };
  useEffect(() => {
    if (adviserDetail) {
      setCurrentPage(1);
      setCurrentPageList(adviserDetail.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage));
    }
  }, [adviserDetail]);

  useEffect(() => {
    axios.get(`${url}/advisers`).then((result) => {
      let list = result.data.slice();
      let onlineList = result.data.filter((el, index) => {
        if (el.isonline) {
          list.splice(index, 1);
          return true;
        }
      });
      setOriginalList([...onlineList, ...list]);
      setAdviserDetail([...onlineList, ...list]);
    });

    //챗 초기화
    // dispatch(setViewChatlist(true));
    // dispatch(setIsChat(false));
    // if (chatState.socket) {
    //   chatState.socket.emit('quitRoom');
    // }
    // dispatch(setMessages([]));
    // dispatch(changeRoom(null));
  }, []);

  const getOption = (e, key) => {
    setFilterOption({ ...filterOption, [key]: e.target.value });
  };
  const getfilterData = () => {
    let data = originalList.slice();
    if (inputRef.current) {
      let value = inputRef.current.input.value;
      data = data.filter((el) => el.name.includes(value) || el.category === value || el.state === value);
    }
    if (filterOption.category !== '전체') {
      data = data.filter((el) => el.category === filterOption.category);
    }
    if (filterOption.gender !== '남+여') {
      data = data.filter((el) => el.gender === filterOption.gender);
    }
    if (filterOption.state !== '전국') {
      data = data.filter((el) => el.state === filterOption.state);
    }
    setAdviserDetail(data);
  };

  useEffect(() => {
    getfilterData();
  }, [filterOption]);

  const setClear = () => {
    inputRef.current.state.value = '';
    setFilterOption({ category: '전체', gender: '남+여', state: '전국' });
  };
  if (adviserDetail === null) {
    return '데이터를 받아오고있습니다.';
  }

  return (
    <AdviserBodyAreaStyle>
      <AdviserContainerStyle>
        <AdviserSection>
          <div className="adviserListContainer">
            {currentPageList.map((el) => (
              <AdviserCard key={el.id} data={el} />
            ))}
            <Pagination
              simple
              defaultCurrent={1}
              current={currentPage}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              total={adviserDetail.length}
              style={{ margin: '20px' }}
            />
          </div>
        </AdviserSection>
      </AdviserContainerStyle>
      <FilterSection>
        <SearchAndFilterStyle>
          <Search
            originalList={originalList}
            type={'adviserList'}
            filterOption={filterOption}
            getfilterData={getfilterData}
            inputRef={inputRef}
          />
          <Button onClick={setClear} style={{ marginTop: '10px', textAlign: 'center', width: '100%', height: '38px' }}>
            필터 초기화
          </Button>
          <FilterStyle>
            <div>
              <div className="title">종목</div>
              <Radio.Group
                className="filterCategory"
                size="large"
                defaultValue="전체"
                onChange={(e) => {
                  getOption(e, 'category');
                }}>
                <Radio.Button className="all" value="전체">
                  전체
                </Radio.Button>
                <Radio.Button value="헬스">헬스</Radio.Button>
                <Radio.Button value="골프">골프</Radio.Button>
                <Radio.Button value="클라이밍">클라이밍</Radio.Button>
                <Radio.Button value="기타">기타</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <div className="title">성별</div>
              <Radio.Group
                className="filterCategory"
                size="large"
                defaultValue="남+여"
                onChange={(e) => {
                  getOption(e, 'gender');
                }}>
                <Radio.Button className="all" value="남+여">
                  남+여
                </Radio.Button>
                <Radio.Button value="남자">남자</Radio.Button>
                <Radio.Button value="여자">여자</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <div className="title">지역</div>
              <Radio.Group
                className="filterCategory"
                size="large"
                defaultValue="전국"
                onChange={(e) => {
                  getOption(e, 'state');
                }}>
                <Radio.Button className="all" value="전국">
                  전국
                </Radio.Button>
                <Radio.Button value="서울">서울</Radio.Button>
                <Radio.Button value="경기/인천">경기/인천</Radio.Button>
                <Radio.Button value="강원도">강원도</Radio.Button>
                <Radio.Button value="충청">충청도</Radio.Button>
                <Radio.Button value="경상도">경상도</Radio.Button>
                <Radio.Button value="전라도">전라도</Radio.Button>
                <Radio.Button value="제주도">제주도</Radio.Button>
              </Radio.Group>
            </div>
          </FilterStyle>
        </SearchAndFilterStyle>
      </FilterSection>
    </AdviserBodyAreaStyle>
  );
}

export default AdvisorListPage;
