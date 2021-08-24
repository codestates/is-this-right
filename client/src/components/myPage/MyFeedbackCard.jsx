import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

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
  //   category: "헬스"
  //   content: "<p>ㄳㄷㅅㄷㄳㄷㅅ</p>"
  //   createdAt: "2021-08-21T14:06:27.000Z"
  //   postId: 10
  //   profileImg: "https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/default_profile.png"
  //   selected: 39
  //   title: "wefwfw"
  //   username: "rkwktmmm"

  const nowTime = Date.now(),
    startTime = new Date(data.createdAt);
  return (
    <CardStyle
      isSelected={data.selected === data.id}
      title={data.title}
      extra={
        <Link to={`/posts/${data.postId}`} style={{ textDecorationLine: 'none' }}>
          Detail
        </Link>
      }>
      <p>Category : {data.category}</p>
      {/* <div>Answer : {parse(data.content)}</div> */}
      <p>
        Time : <Moment fromNow>{startTime}</Moment>
      </p>
      <p style={{ textAlign: 'center' }}>
        {data.selected === data.id ? (
          <CheckCircleSharpIcon style={{ color: 'green', fontSize: '25px' }} />
        ) : (
          <CheckCircleOutlined style={{ color: '#686868', fontSize: '25px' }} />
        )}
      </p>
    </CardStyle>
  );
}

export default MypostCard;
