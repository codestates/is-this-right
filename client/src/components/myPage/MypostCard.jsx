import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { CheckCircleOutlined } from '@ant-design/icons';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const CardStyle = styled(Card)`
  width: 300px;
  height: 300px;
  margin: 10px 10px 10px;
  position: relative;
  border: ${(props) => (props.isSelected ? '0px solid black' : '1px solid #e1e4e8')};
  box-shadow: ${(props) =>
    props.isSelected
      ? `rgba(52, 208, 89, 0.34) -2px 3px 9px 0px,
				rgba(51, 207, 87, 0.34) 3px -2px 9px 0px`
      : null};

  p:last-child {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
`;

function MypostCard({ data }) {
  console.log(data);
  // [{
  //     title : "title",
  //     category : "헬스",
  //     feedbackCount : 4,
  //     selected : false,
  //     updatedAt : "2021-08-21T14:52:11.000Z",
  // },
  //  ...]
  // <Link to={`/posts/${el.id}`} style={{ margin: '5px 0px 5px 0px', textDecorationLine: 'none', width: 'auto' }}>

  const nowTime = Date.now(),
    startTime = new Date(data.updatedAt);
  return (
    <CardStyle
      isSelected={data.selected}
      title={data.title}
      extra={
        <Link to={`/posts/${data.id}`} style={{ textDecorationLine: 'none' }}>
          Detail
        </Link>
      }>
      <p>Category : {data.category}</p>
      <p>Answers : {data.feedbackCount}</p>
      <p>
        Time : <Moment fromNow>{startTime}</Moment>
      </p>
      <p style={{ textAlign: 'center' }}>
        {data.selected ? (
          <CheckCircleSharpIcon style={{ color: 'green', fontSize: '25px' }} />
        ) : (
          <CheckCircleOutlined style={{ color: '#686868', fontSize: '25px' }} />
        )}
      </p>
    </CardStyle>
  );
}

export default MypostCard;
