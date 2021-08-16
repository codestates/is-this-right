import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import AdviserFeedbackDetail from '../components/adviser/AdviserFeedbackDetail';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const UserInfoStyle = styled.div`
  /* flex: 0.5 1 auto; */
  width: 100%;
  height: 20%;
  background-color: red;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
`;
const DetailStyle = styled.div`
  width: 100%;
  /* flex: 1 1 auto; */
  height: 30%;

  background-color: orange;
`;
const FeedbacksStyle = styled.div`
  width: 100%;
  /* flex: 2 1 auto; */
  height: 100%;

  background-color: yellow;
`;

const AvatarStyle = styled.div`
  height: 100%;
  margin-left: 10%;
`;

const UserStyle = styled.div`
  width: 60%;
  margin-left: 10%;
`;

const FeedbackStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function AdvisorDetailPage() {
  const [adviserDetailInfo, setAdviserDetailInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${url}/advisers/${id}`).then((data) => setAdviserDetailInfo(data.data));
  }, []);

  if (adviserDetailInfo === null) {
    return '정보를 받아오고 있습니다.';
  }

  return (
    <BodyAreaStyle>
      <ContainerStlye style={{ display: 'flex', flexDirection: 'column' }}>
        <UserInfoStyle>
          <AvatarStyle>
            <Avatar
              size={{ xs: 124, sm: 132, md: 140, lg: 164, xl: 180, xxl: 200 }}
              src={adviserDetailInfo.profileImg}
            />
          </AvatarStyle>
          <UserStyle>
            <div>이름 : {adviserDetailInfo.name}</div>
            <div>종목 : {adviserDetailInfo.category}</div>
            <div>지역 : {adviserDetailInfo.state}</div>
            <div>URL : {adviserDetailInfo.url}</div>
          </UserStyle>
        </UserInfoStyle>
        <DetailStyle>
          디테일
          <div>{adviserDetailInfo.detail}</div>
        </DetailStyle>
        <FeedbacksStyle>
          <div>피드백들</div>
          {adviserDetailInfo.feedbacks.length === 0 ? (
            <FeedbackStyle>
              <img src="../../imageFile/pngegg.png" style={{ width: '50%', height: '50%' }} />
            </FeedbackStyle>
          ) : (
            adviserDetailInfo.feedbacks.map((el) => (
              <Link to={`/posts/${el.postId}`}>
                <AdviserFeedbackDetail data={el} />
              </Link>
            ))
          )}
        </FeedbacksStyle>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default AdvisorDetailPage;
