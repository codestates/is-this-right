import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';

const Top10Styled = styled.div`
  width: 25%;
  height: 55%;
  margin: 10px;
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
`;

const TopAdviserDataStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
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
      <div>Most Helpful</div>
      {mockAdviser.map((el) => (
        <div>
          <hr></hr>
          <TopAdviserDataStyle>
            <div>
              <Avatar icon={el.proFileImg} />
              <span style={{ marginLeft: '5px' }}>{el.name}</span>
            </div>
            <div>
              <CheckCircleTwoTone />
              <span>{el.numOfFeedback}</span>
            </div>
          </TopAdviserDataStyle>
        </div>
      ))}
    </Top10Styled>
  );
}

export default Top10List;
