import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

const CardContainer = styled.div`
  display: flex;
  height: 200px;
  width: 15vw;
  background: #ffffff;
  flex-direction: column;
  justify-content: space-between;
  color: #353535;
  border-radius: 10px;
  padding: 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  box-shadow: ${(props) => (props.isSelected ? '0 0 3px rgba(18, 168, 3,0.5)' : 'none')};
  :hover {
    border: 1px solid #aaa;
    transition: 0.1s;
  }
  @media ${(props) => props.theme.avatar} {
    width: 100%;
    height: 140px;
  }
  .headerSection {
    display: flex;
    padding-bottom: 5px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .title {
      display: flex;
      align-items: center;
      flex: 3;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* font-weight: bold; */
      @media ${(props) => props.theme.avatar} {
        width: 180px;
      }
    }
    .moment {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      font-size: 0.7rem;
      color: #777;
    }
  }
  .content {
    margin-top: -70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media ${(props) => props.theme.avatar} {
      width: 180px;
      margin-top: -10px;
    }
  }
  .footerSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .category {
      color: #0077b6;
    }
    .selected {
      display: flex;
      align-items: center;
    }
  }
`;

function MypostCard({ data }) {
  const nowTime = Date.now(),
    startTime = new Date(data.createdAt);
  return (
    <CardContainer isSelected={data.selected === data.id}>
      <div className="headerSection">
        <div className="title">{data.title}</div>
        <div className="moment">
          <Moment fromNow>{startTime}</Moment>
        </div>
      </div>
      <div className="content">{data.content.replace(/<\/?[^>]>/g, '')}</div>
      <div className="footerSection">
        <div className="category">#{data.category}</div>
        <div className="selected">
          {data.selected === data.id ? (
            <CheckCircleOutlined style={{ color: '#12A803', fontSize: '1rem' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#353535', fontSize: '1rem' }} />
          )}
          <div className="feedbackCount">{data.feedbackCount}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default MypostCard;
