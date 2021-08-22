import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { changeRoom, setIsChat, setViewChatlist, setRoomName } from '../../actions/chatAction';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_API_URL;

const AdviserCardStyle = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  transition: 0.2s ease-in-out;
  :hover {
    box-shadow: 0 0 5px rgba(3, 4, 94, 0.5);
  }

  .avatar {
    margin-left: 2vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
    }
  }
  .adviserInfo {
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 100%;
    :hover {
      cursor: pointer;
    }
    .name {
      height: 20%;
    }
    .name > span:first-child {
      font-weight: bold;
      font-size: 1.5rem;
      margin-right: 3px;
    }
    .text {
      font-size: 0.9rem;

      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 30%;
      .state {
        display: flex;
        align-items: center;
        color: #777777;
      }
      .category {
        margin-top: 5px;
        color: #000;
        font-size: 1rem;
      }
    }
  }
  .chat {
    display: flex;
    width: 30%;
    justify-content: flex-end;
    height: 40%;
    .chatButton {
      padding: 5px 30px 5px 30px;
      border-radius: 3px;
      background: linear-gradient(60deg, #0096c7, #0077b6);
      color: white;
      margin-bottom: 25px;
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: center;
      min-width: 150px;
      box-shadow: 0 0 4px rgba(3, 4, 94, 0.3);
      :hover {
        cursor: pointer;
        box-shadow: 0 0 6px rgba(3, 4, 94, 0.5);
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)``;

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
      dispatch(setRoomName(data.name));
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };
  return (
    <AdviserCardStyle>
      <div className="avatar" onClick={sendDataToDetailPage}>
        <StyledAvatar shape="square" size={150} icon={<img src={data.user.profileImg} />} />
      </div>
      <div className="adviserInfo" onClick={sendDataToDetailPage}>
        <div className="name">
          <span>{data.name}</span>
          <span>님</span>
        </div>
        <div className="text">
          <div className="state">
            <EnvironmentOutlined />
            {data.state}
          </div>
          <div className="category">{data.category}</div>
        </div>
      </div>
      <div className="chat">
        <div
          className="chatButton"
          onClick={() => createChatRoom(data.userId)}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          채팅하기
          <MessageOutlined />
        </div>
      </div>
    </AdviserCardStyle>
  );
}

export default AdviserCard;
