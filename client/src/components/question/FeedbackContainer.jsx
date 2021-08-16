import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const FeedbackContainerStyle = styled.div`
  width: 100%;
  height: 30%;
  background-color: red;
  display: flex;
`;

const ContentStyle = styled.div`
  width: 80%;
  min-height: 30%;
  background-color: blue;
`;

function FeedbackContainer({ adviser }) {
  console.log(adviser);
  // "id":5
  // "adviserId" : 3
  // "name" : "김병민"
  // "profileImg" : "img.jpg"
  // "content" : "이걸고치셔야합니다."
  // "createdAt" : 2021-08-04
  // "updatedAt" : 2021-08-04
  return (
    <FeedbackContainerStyle>
      <div>
        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} icon={<img src={adviser.profileImg} />} />
        <div>{adviser.name}</div>
      </div>
      <ContentStyle>{adviser.content}</ContentStyle>
      <div>check</div>
    </FeedbackContainerStyle>
  );
}

export default FeedbackContainer;
