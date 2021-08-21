import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setIsChat, setViewChatlist } from '../../actions/chatAction';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_API_URL;

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
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const id = data.id;
  const history = useHistory();
  const sendDataToDetailPage = () => {
    history.push(`/advisers/${id}`);
  };
  const createChatRoom = (userId) => {
    //방만들고 룸넘버 획득
    if (state.logIn) {
      let payload = {
        sender: state.userInfo.id,
        receiver: userId,
      };
      axios.post(`${url}/chats`, payload).then((data) => {
        dispatch(changeRoom(data.data.data.roomId));
        chatState.socket.emit('join', { room: data.data.data.roomId });
        dispatch(setIsChat(true));
        dispatch(setViewChatlist(false));
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };
  return (
    <AdviserCardStyle>
      <div>
        <NameStyle onClick={sendDataToDetailPage}>{data.name}님</NameStyle>
        {/* <TextStyle onClick={sendDataToDetailPage}>닉 네 임: {data.user.username}</TextStyle> */}
        <TextStyle onClick={sendDataToDetailPage}>카테고리: {data.category}</TextStyle>
        <TextStyle onClick={sendDataToDetailPage}>지 역: {data.state}</TextStyle>
        <button onClick={() => createChatRoom(data.userId)}>채팅하러가기</button>
      </div>
      <AvatarStyle onClick={sendDataToDetailPage} shape="square" size={150} icon={<img src={data.user.profileImg} />} />
    </AdviserCardStyle>
  );
}

export default AdviserCard;
