import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { CheckCircleTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import Moment from 'react-moment';

const AdviserCardStyle = styled.div`
  padding-top: 20px;
  position: relative;
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* color: #fafafa; */
  color: #353535;
  :hover {
    padding-bottom: 1px;
  }
  :hover .background {
    /* border: 3px solid #f8bb00; */
    /* border: 3px solid #12a803; */
    box-shadow: 0 0 5px rgba(3, 4, 94, 0.3);
    transition: 0.1s ease-in-out;
  }
  @media ${(props) => props.theme.mobile} {
    width: 95vw;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 110px;
    border-radius: 5px;
    bottom: 0;
    border: 1px solid #ddd;
    /* background: linear-gradient(60deg, #0096c7, #00b4d8); */
    background: white;
    /* background: #0177b6; */

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

    @media ${(props) => props.theme.mobile} {
      width: 30%;
    }
    .postTitle {
      font-size: 1.1rem;
      /* color: #353535; */
      border-bottom: 1px solid #ddd;
    }
    .content {
      padding-top: 5px;
      font-size: 0.8rem;
      display: block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* color: #353535; */
      @media ${(props) => props.theme.mobile} {
        width: 100px;
      }
    }
  }
  .info {
    position: relative;
    display: flex;
    gap: 30px;
    .moment {
      position: relative;
      font-size: 0.8rem;
      color: #777;
      /* color: #ddd; */
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
            <CheckCircleOutlined style={{ color: '#12A803' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#aaa' }} />
          )}
        </div>
      </div>
    </AdviserCardStyle>
  );
}

export default AdviserFeedbackDetail;
