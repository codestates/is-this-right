import React from 'react';
import styled from 'styled-components';
import { Avatar, Badge } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { changeRoom, setIsChat, setViewChatlist, setRoomName } from '../../actions/chatAction';
import axios from 'axios';
axios.defaults.withCredentials = true;

const url = process.env.REACT_APP_API_URL;

const AdviserCardStyle = styled.div`
  position: relative;
  width: 250px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media ${(props) => props.theme.mobile} {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    height: 200px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  :hover {
    @media ${(props) => props.theme.mobile} {
      height: 200px;
    }
  }
  .cardBackground {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1px rgba(3, 4, 94, 0.2);
    border: 1px solid #e1e1e1;
    background: #fafafa;
    border-radius: 10px;

    @media ${(props) => props.theme.mobile} {
      display: none;
      margin-left: 10px;
      border-radius: 25px 0 0 25px;
      height: 100%;
      bottom: 0;
    }
  }
  .background {
    position: absolute;
    bottom: 0;
    border-radius: 40% 40% 10px 10px;
    /* border: 4px solid white; */
    background: linear-gradient(180deg, rgba(2, 62, 138, 0.9), #0077b6 20%);
    /* background: linear-gradient(60deg, rgba(2, 62, 138, 0.9), rgba(2, 62, 138)); */
    /* background: #0077b6; */
    height: 200px;
    width: 100%;
    border: 1px solid #eef;
    border-top: none;
    @media ${(props) => props.theme.mobile} {
      background: linear-gradient(30deg, rgba(2, 62, 138, 0.9), #0077b6 20%);
      height: 150px;
      border-radius: 90px 0 0 90px;
      border-right: 0;
      right: 0;
      width: 100%;
      left: 120px;
      bottom: 25px;
    }
  }
  :hover .background {
    /* margin-bottom: 10px; */
  }
  .avatar {
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    border: 5px solid #fafafa;
    margin-top: 20px;
    /* box-shadow: 0 0 5px rgba(3, 4, 94, 0.2); */
    :hover {
      cursor: pointer;
    }
    @media ${(props) => props.theme.mobile} {
      margin-left: 15px;
      margin-top: 0;
    }
  }

  :hover .avatar {
    margin-top: 10px;
    @media ${(props) => props.theme.mobile} {
      margin-top: -20px;
    }
  }

  .adviserInfo {
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2px;
    @media ${(props) => props.theme.mobile} {
      flex: 2;
      height: 100%;
      justify-content: center;
    }
    :hover {
      cursor: pointer;
    }
    .name {
      position: relative;
      span {
        position: relative;
      }
      .badge {
        position: absolute;
        left: 10px;
        bottom: -1px;
      }
    }
    .name > span:first-child {
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 3px;
      font-family: 'font-css';
    }
    .text {
      display: flex;
      flex-direction: column;
      /* display: grid;
      grid-template-columns: 1fr 10px 1fr;
      width: 100%; */
      .state {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        justify-content: center;
        color: #ccc;
      }
      /* .divider {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      } */
      .category {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
      }
    }
  }
  .chat {
    @media ${(props) => props.theme.mobile} {
      height: 100%;
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    position: relative;
    .chatButton {
      background: #fff;
      color: #1e40af;
      border-radius: 3px;
      font-size: 0.9rem;
      font-weight: bold;
      padding: 7px 20px 7px 20px;
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.6);
      @media ${(props) => props.theme.mobile} {
        width: 80px;
        height: 40px;
      }
      div {
        margin-right: 2px;
        @media ${(props) => props.theme.mobile} {
          display: none;
        }
      }
      :hover {
        cursor: pointer;
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.9);
        font-size: 0.94rem;
        transition: 0.1s ease-in-out;
        @media ${(props) => props.theme.mobile} {
          font-size: 1rem;
          height: 41px;
          width: 85px;
        }
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
      <div className="cardBackground" />
      <div className="background" />
      <div className="avatar" onClick={sendDataToDetailPage}>
        <StyledAvatar size={150} icon={<img src={data.user.profileImg} />} />
      </div>
      <div className="adviserInfo" onClick={sendDataToDetailPage}>
        <div className="name">
          <span>{data.name}</span>
          <span>
            님
            <div className="badge" style={data.isonline ? {} : { display: 'none' }}>
              <Badge status={'success'} />
            </div>
          </span>
        </div>
        <div className="text">
          <div className="state">
            <EnvironmentOutlined />
            {data.state}
          </div>
          {/* <div className="divider">|</div> */}
          <div className="category">{data.category}</div>
        </div>
      </div>
      <div className="chat">
        <div
          className="chatButton"
          onClick={() => createChatRoom(data.userId)}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>채팅하기</div>
          <MessageOutlined />
        </div>
      </div>
      <div className="badge"></div>
    </AdviserCardStyle>
  );
}

export default AdviserCard;
