import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';

const Top10Styled = styled.div`
  width: 300px;
  height: 400px;
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
  const mockAdviser = [
    {
      proFileImg: <UserOutlined />,
      name: '김',
      numOfFeedback: 10,
    },
    {
      proFileImg: <UserOutlined />,
      name: '병',
      numOfFeedback: 9,
    },
    {
      proFileImg: <UserOutlined />,
      name: '민',
      numOfFeedback: 8,
    },
    {
      proFileImg: <UserOutlined />,
      name: '박',
      numOfFeedback: 7,
    },
    {
      proFileImg: <UserOutlined />,
      name: '상',
      numOfFeedback: 6,
    },
    {
      proFileImg: <UserOutlined />,
      name: '현',
      numOfFeedback: 5,
    },
    {
      proFileImg: <UserOutlined />,
      name: '김',
      numOfFeedback: 4,
    },
    {
      proFileImg: <UserOutlined />,
      name: '성',
      numOfFeedback: 3,
    },
    {
      proFileImg: <UserOutlined />,
      name: '훈',
      numOfFeedback: 2,
    },
    {
      proFileImg: <UserOutlined />,
      name: '정',
      numOfFeedback: 1,
    },
  ];
  return (
    <Top10Styled>
      <TextStyle>Most Helpful</TextStyle>
      {mockAdviser.map((el) => (
        <div>
          <hr style={{ margin: '5px' }}></hr>
          <TopAdviserDataStyle>
            <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
              <Avatar size="small" icon={el.proFileImg} />
              <TextStyle style={{ marginLeft: '5px' }}>{el.name}</TextStyle>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleTwoTone />
              <TextStyle>{el.numOfFeedback}</TextStyle>
            </div>
          </TopAdviserDataStyle>
        </div>
      ))}
    </Top10Styled>
  );
}

export default Top10List;
