import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

const AdviserCardStyle = styled.div`
  background-color: white;
  border-bottom: 1px solid black;

  width: 95%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2px 0px 2px 0px;
`;

const TextStyle = styled.div`
  color: #555555;
`;

function AdviserCard({ data }) {
  console.log(data);
  return (
    <AdviserCardStyle>
      <div>
        <div style={{ fontSize: '1.3em', fontWeight: 'bold', color: 'black' }}>{data.name}님</div>
        <TextStyle>닉네임: {data.user.username}</TextStyle>
        <TextStyle>카테고리: {data.category}</TextStyle>
        {/* 종목 이름 지역 */}
      </div>
      <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<img src={data.user.profileImg} />} />
    </AdviserCardStyle>
  );
}

export default AdviserCard;
