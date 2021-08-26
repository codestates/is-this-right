import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

const PostCardStyle = styled.div`
  display: flex;
  height: 100%;
  border-bottom: 1px dashed #ddd;
  padding: 15px;
  :hover {
    border: 1px dashed #ddd;
    margin-top: -1px;
  }
  .avatarSection {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .postInfoSection {
    flex: 5;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-left: 20px;
    .title {
      font-size: 1.2rem;
    }
    .moment {
      font-size: 0.8rem;
    }
    .name {
      font-size: 0.8rem;
    }
  }
  .selectedSection {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    .count {
      margin-left: 5px;
    }
  }
  @media ${(props) => props.theme.mobile} {
    padding-left: 30px;
  }
`;

const NumStyle = styled.span`
  margin-left: 10px;
  color: ${(props) => (props.props === 0 ? '#686868' : 'green')};
  font-size: 25px;
`;

function PostCard({ data }) {
  // [{
  //     "id" : PK,
  //     "username" : "username"
  //     "title" : "title"
  //     "img" : "img"
  //     "category" : "헬스"
  //     "commentNum" : 4
  //     "isAnswered" : false
  //     "createdAt" : 2021-08-04
  //     "updatedAt" : 2021-08-04
  // },
  //  ...]
  console.log(data);
  const nowTime = Date.now(),
    startTime = new Date(data.updatedAt);
  return (
    <PostCardStyle>
      <div className="avatarSection">
        <Avatar
          size={80}
          icon={<img src={data.profileImg} />} // img데이터 넣기
        />
      </div>
      <div className="postInfoSection">
        <div className="title">{data.title}</div>
        <div className="moment">
          <Moment fromNow>{startTime}</Moment>
        </div>
        <span className="name">{data.username}</span>
      </div>
      <div className="selectedSection">
        {data.selected ? (
          <CheckCircleOutlined style={{ color: '#12A803' }} />
        ) : (
          <CheckCircleOutlined style={{ color: '#aaa' }} />
        )}
        <span className="count">{data.feedbackCount}</span>
      </div>
    </PostCardStyle>
  );
}

export default PostCard;
