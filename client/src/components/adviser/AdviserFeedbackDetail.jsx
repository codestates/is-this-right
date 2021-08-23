import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import Moment from 'react-moment';

const AdviserCardStyle = styled.div`
  padding-top: 20px;
  position: relative;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  :hover {
    padding-bottom: 1px;
  }
  :hover .background {
    box-shadow: 0 0 12px rgba(3, 4, 94, 0.8);
    transition: 0.1s ease-in-out;
  }
  @media ${(props) => props.theme.mobile} {
    width: 95vw;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 90px;
    border-radius: 5px;
    bottom: 0;
    background: linear-gradient(60deg, #0096c7, #00b4d8);
    box-shadow: 0 0 10px rgba(3, 4, 94, 0.6);

    @media ${(props) => props.theme.mobile} {
      width: 95vw;
    }
  }
  .user {
    left: 0;
    position: relative;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      margin-bottom: 5px;
    }
    .name {
      color: #fff;
      font-size: 1rem;
      margin-bottom: 40px;
    }
  }
  .post {
    padding-bottom: 10px;
    width: 40%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .postTitle {
      font-size: 1.2rem;
      color: #fff;
    }
    .content {
      font-size: 0.9rem;
      display: block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
  }
  .info {
    position: relative;
    display: flex;
    gap: 30px;
    .moment {
      position: relative;
      font-size: 0.8rem;
      color: #dddddd;
      height: 100%;
      display: flex;
      align-items: center;
      right: 0;
    }
    .selected {
      position: relative;
      padding-right: 30px;
      font-size: 1.2rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

function AdviserFeedbackDetail({ data }) {
  return (
    <AdviserCardStyle>
      <div className="background" />
      <div className="user">
        <div className="avatar">
          <Avatar size={80} src={<img src={data.profileImg} />} />
        </div>
        <div className="name">{data.username}</div>
      </div>
      <div className="post">
        <div className="postTitle">{data.title}</div>

        <div className="content">{data.content.replace(/<\/?[^>]>/g, '')}</div>
      </div>
      <div className="info">
        <div className="moment">
          <Moment fromNow>{new Date(data.createdAt)}</Moment>
        </div>
        <div className="selected">
          {data.selected ? (
            <CheckCircleOutlined style={{ color: '#8ac926' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#dddddd' }} />
          )}
        </div>
      </div>
    </AdviserCardStyle>
  );
}

export default AdviserFeedbackDetail;
