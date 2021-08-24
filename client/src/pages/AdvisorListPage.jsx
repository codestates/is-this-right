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

const AdviserBodyAreaStyle = styled(BodyAreaStyle)`
  @media ${(props) => props.theme.mobile} {
  }
`;
const AdviserContainerStyle = styled(ContainerStlye)`
  width: 100vw;
  padding: 2vw 7vw 2vw 5vw;

  @media ${(props) => props.theme.mobile} {
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
    overflow-x: hidden;
    margin-bottom: 15vh;
    width: 100vw;
  }
  .adviserSection {
    float: left;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    @media ${(props) => props.theme.mobile} {
      float: none;
      width: 100%;
    }
    .pagination {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .adviserListContainer {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100%;
      gap: 3vw;
      padding-right: 3vw;
      padding-left: 3vw;
      row-gap: 20px;
      padding-bottom: 20px;
      @media ${(props) => props.theme.medium} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      @media ${(props) => props.theme.mobile} {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 0;
        padding-bottom: 20px;
      }
    }
  }

  .filterSection {
    background: #fff;
    float: right;
    min-width: 300px;
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
    }
    .filter {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
      @media ${(props) => props.theme.mobile} {
        gap: 0;
      }
      .category {
        border-top: 1px solid #ddd;
        padding-top: 10px;
        padding-bottom: 10px;
        @media ${(props) => props.theme.mobile} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .title {
          color: #353535;
          @media ${(props) => props.theme.mobile} {
            width: 10%;
          }
        }
        .filterCategory {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          @media ${(props) => props.theme.mobile} {
            flex-wrap: none;
            width: 100%;
            gap: 5px;
          }
          .all {
            width: 100%;
            display: flex;
            justify-content: center;
            @media ${(props) => props.theme.mobile} {
              width: auto;
            }
          }
          > label {
            width: 48%;
            display: flex;
            justify-content: center;
            @media ${(props) => props.theme.mobile} {
              width: auto;
            }
          }
        }
      }
    }
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
  const PAGE_SIZE = 6;
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

    // 챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
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
        <div className="adviserSection">
          <div className="adviserListContainer">
            {currentPageList.map((el) => (
              <AdviserCard key={el.id} data={el} />
            ))}
          </div>
          <div className="pagination">
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
        </div>
        <div className="filterSection">
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
          <div className="filter">
            <div className="category">
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
            <div className="category">
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
            <div className="category">
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
          </div>
        </div>
      </AdviserContainerStyle>
    </AdviserBodyAreaStyle>
  );
}

export default AdvisorListPage;
