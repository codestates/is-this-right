import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getTopAdvisers } from '../../actions/adviserActionIndex';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Top10Styled = styled.div`
  width: 300px;
  height: 600px;
  margin: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  padding: 10px;
`;

const TopAdviserDataStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
  width: 100%;
  padding: 0px 10px 0px 10px;
`;

const TextStyle = styled.span`
  font-size: 1em;
  text-overflow: ellipsis;
  width: 100%;
`;

function Top10List() {
  const top10List = useSelector((state) => state.adviserReducer.topAdvisers);

  console.log('나오냐??', top10List);

  useEffect(() => {
    console.log(top10List);
  }, [top10List]);

  return (
    <Top10Styled>
      <TextStyle>Most Helpful</TextStyle>
      {top10List.map((el) => (
        <div style={{ height: '50px' }}>
          <hr style={{ margin: '5px' }}></hr>
          <TopAdviserDataStyle>
            <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
              <Avatar src={el.profileImg} />
              <TextStyle style={{ marginLeft: '5px' }}>{el.name}</TextStyle>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleTwoTone />
              <TextStyle>{el.selectedCount}</TextStyle>
            </div>
          </TopAdviserDataStyle>
        </div>
      ))}
    </Top10Styled>
  );
}

export default Top10List;
