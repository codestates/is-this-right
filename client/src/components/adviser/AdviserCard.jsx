import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

const AdviserCardStyle = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2px 0px 2px 0px;
`;

function AdviserCard({ data }) {
  console.log(data);
  return (
    <AdviserCardStyle>
      <div>
        <div>{data.name}</div>
        <div>{data.category}</div>
      </div>
      <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<img src={data.user.profileImg} />} />
    </AdviserCardStyle>
  );
}

export default AdviserCard;
