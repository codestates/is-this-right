import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';

const PostCardStyle = styled.div`
  background-color: white;
  border-top: 1px solid #ebedef;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2px 0px 2px 0px;
  @media ${(props) => props.theme.mobile} {
    padding-left: 30px;
  }
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
  const nowTime = Date.now(),
    startTime = new Date(data.createdAt);
  return (
    <PostCardStyle>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          size={100}
          icon={<img src={data.profileImg} />} // img데이터 넣기
        />
        <div style={{ marginLeft: '30px' }}>
          <div style={{ fontSize: '1.3rem', color: 'black' }}>{data.title}</div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#686868' }}>{data.username}</span>
            <Moment fromNow style={{ fontSize: '0.8rem', color: '#686868', marginLeft: '5px' }}>
              {startTime}
            </Moment>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {data.selected ? (
            <CheckCircleTwoTone style={{ color: 'green', fontSize: '25px' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#686868', fontSize: '25px' }} />
          )}
        </div>
        <div style={{ marginLeft: '30px' }}>{data.commentNum}</div>
      </div>
    </PostCardStyle>
  );
}

export default PostCard;
