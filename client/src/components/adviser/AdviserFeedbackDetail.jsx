import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

const AdviserCardStyle = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2px 0px 2px 0px;
`;

function AdviserFeedbackDetail({ data }) {
  return (
    <AdviserCardStyle>
      <div style={{ width: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {data.content}
      </div>
      <div>{data.createdAt}</div>
      <div>{data.post.title}</div>
      <div>{data.post.selected ? <CheckCircleTwoTone /> : <CheckCircleOutlined />}</div>
    </AdviserCardStyle>
  );
}

export default AdviserFeedbackDetail;
