import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';

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

const AvatarStyle = styled(Avatar)`
  :hover {
    cursor: pointer;
  }
`;

const NameStyle = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: black;
  :hover {
    cursor: pointer;
  }
`;

const TextStyle = styled.div`
  color: #555555;
  :hover {
    cursor: pointer;
  }
`;

function AdviserCard({ data }) {
  console.log(data);
  const id = data.id;
  const history = useHistory();
  const sendDataToDetailPage = () => {
    history.push(`/advisers/${id}`);
  };
  return (
    <AdviserCardStyle>
      <div>
        <NameStyle onClick={sendDataToDetailPage}>{data.name}님</NameStyle>
        {/* <TextStyle onClick={sendDataToDetailPage}>닉 네 임: {data.user.username}</TextStyle> */}
        <TextStyle onClick={sendDataToDetailPage}>카테고리: {data.category}</TextStyle>
        <TextStyle onClick={sendDataToDetailPage}>지 역: {data.state}</TextStyle>
      </div>
      <AvatarStyle onClick={sendDataToDetailPage} shape="square" size={150} icon={<img src={data.user.profileImg} />} />
    </AdviserCardStyle>
  );
}

export default AdviserCard;
