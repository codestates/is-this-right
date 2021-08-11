import React from 'react';
import styled from 'styled-components';

const BodyAreaStyle = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const ContainerStlye = styled.div`
  width: 60%;
  background-color: black;
`;

function QuestionListPage() {
  return (
    <BodyAreaStyle>
      <ContainerStlye>페이지 내용</ContainerStlye>
    </BodyAreaStyle>
  );
}

export default QuestionListPage;
