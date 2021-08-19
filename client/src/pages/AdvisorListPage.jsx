import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AdviserCard from '../components/adviser/AdviserCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
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
  useEffect(() => {
    axios.get(`${url}/advisers`).then((result) => setAdviserDetail(result.data));
  }, []);

  if (adviserDetail === null) {
    return '데이터를 받아오고있습니다.';
  }

  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ display: 'flex' }}>
        <AdviserCardListStyle>
          {/* <AdviserCard />
          <AdviserCard /> */}
          {adviserDetail.map((el) => (
            <AdviserCardSectionStyle to={`/advisers/${el.id}`}>
              <AdviserCard data={el} key="" />
            </AdviserCardSectionStyle>
          ))}
          <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
          <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
          <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
          <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
          <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
        </AdviserCardListStyle>
        <SearchAndFilterStyle>
          <Search />
          <FilterStyle>
            <Radio.Group size="large">
              <Radio.Button value="헬스">헬스</Radio.Button>
              <Radio.Button value="골프">골프</Radio.Button>
              <Radio.Button value="클라이밍">클라이밍</Radio.Button>
              <Radio.Button value="기타">기타</Radio.Button>
            </Radio.Group>
            <Radio.Group size="large">
              <Radio.Button value="남자">남자</Radio.Button>
              <Radio.Button value="여자">여자</Radio.Button>
            </Radio.Group>
            <Radio.Group size="large">
              <Radio.Button value="서울">서울</Radio.Button>
              <Radio.Button value="경기">경기</Radio.Button>
              <Radio.Button value="인천">인천</Radio.Button>
              <Radio.Button value="강원">강원</Radio.Button>
              <Radio.Button value="충청남도">충청남도</Radio.Button>
              <Radio.Button value="충청북도">충청북도</Radio.Button>
              <Radio.Button value="대전">대전</Radio.Button>
              <Radio.Button value="세종">세종</Radio.Button>
              <Radio.Button value="경상남도">경상남도</Radio.Button>
              <Radio.Button value="경상북도">경상북도</Radio.Button>
              <Radio.Button value="울산">울산</Radio.Button>
              <Radio.Button value="부산">부산</Radio.Button>
              <Radio.Button value="대구">대구</Radio.Button>
              <Radio.Button value="전라북도">전라북도</Radio.Button>
              <Radio.Button value="전라남도">전라남도</Radio.Button>
              <Radio.Button value="광주">광주</Radio.Button>
              <Radio.Button value="제주도">제주도</Radio.Button>
            </Radio.Group>
          </FilterStyle>
        </SearchAndFilterStyle>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default AdvisorListPage;
