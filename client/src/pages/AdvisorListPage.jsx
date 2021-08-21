import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AdviserCard from '../components/adviser/AdviserCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Radio, Pagination } from 'antd';
import Search from '../components/Search';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const AdviserCardListStyle = styled.div`
  width: 80%;
  flex: 3 1 auto;
  /* background-color: green; */
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdviserCardSectionStyle = styled(Link)`
  width: 100%;
  /* height: 350px; */
  /* background-color: orange; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration-line: none;
`;

const SearchAndFilterStyle = styled.div`
  flex: 1 1 auto;
  background-color: blue;
  margin: 20px;
  display: flex;
  width: 20%;
  flex-direction: column;
  /* flex-wrap: wrap; */
`;

const FilterStyle = styled.div`
  /* background-color: red; */
  height: 100%;
  width: 100%;
`;

function AdvisorListPage() {
  const [adviserDetail, setAdviserDetail] = useState(null);
  const [originalList, setOriginalList] = useState([]);
  const [filterOption, setFilterOption] = useState({ category: '전체', gender: '남+여', state: '전국' });
  const inputRef = useRef(null);
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

  if (adviserDetail === null) {
    return '데이터를 받아오고있습니다.';
  }
  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ display: 'flex' }}>
        <AdviserCardListStyle>
          {/* <AdviserCard />
          <AdviserCard /> */}
          {currentPageList.map((el) => (
            <AdviserCardSectionStyle key={el.id} to={`/advisers/${el.id}`}>
              <AdviserCard data={el} />
            </AdviserCardSectionStyle>
          ))}
          <Pagination
            simple
            defaultCurrent={1}
            current={currentPage}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            total={adviserDetail.length}
          />
        </AdviserCardListStyle>
        <SearchAndFilterStyle>
          <Search
            originalList={originalList}
            type={'adviserList'}
            filterOption={filterOption}
            getfilterData={getfilterData}
            inputRef={inputRef}
          />
          <FilterStyle>
            <div>종목</div>
            <Radio.Group
              size="large"
              defaultValue="전체"
              onChange={(e) => {
                getOption(e, 'category');
              }}>
              <Radio.Button value="전체">전체</Radio.Button>
              <Radio.Button value="헬스">헬스</Radio.Button>
              <Radio.Button value="골프">골프</Radio.Button>
              <Radio.Button value="클라이밍">클라이밍</Radio.Button>
              <Radio.Button value="기타">기타</Radio.Button>
            </Radio.Group>
            <div>성별</div>
            <Radio.Group
              size="large"
              defaultValue="남+여"
              onChange={(e) => {
                getOption(e, 'gender');
              }}>
              <Radio.Button value="남+여">남+여</Radio.Button>
              <Radio.Button value="남자">남자</Radio.Button>
              <Radio.Button value="여자">여자</Radio.Button>
            </Radio.Group>
            <div>지역</div>
            <Radio.Group
              size="large"
              defaultValue="전국"
              onChange={(e) => {
                getOption(e, 'state');
              }}>
              <Radio.Button value="전국">전국</Radio.Button>
              <Radio.Button value="서울">서울</Radio.Button>
              <Radio.Button value="경기/인천">경기/인천</Radio.Button>
              <Radio.Button value="강원도">강원도</Radio.Button>
              <Radio.Button value="충청">충청도</Radio.Button>
              <Radio.Button value="경상도">경상도</Radio.Button>
              <Radio.Button value="전라도">전라도</Radio.Button>
              <Radio.Button value="제주도">제주도</Radio.Button>
            </Radio.Group>
          </FilterStyle>
        </SearchAndFilterStyle>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default AdvisorListPage;
