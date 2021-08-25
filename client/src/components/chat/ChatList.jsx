import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setViewChatlist, setRoomName } from '../../actions/chatAction';
import { Avatar, Image, Badge } from 'antd';
import Moment from 'react-moment';
import styled from 'styled-components';
import { fontSize } from '@material-ui/system';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ListContainer = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
  }
  .listitem {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-start;

    .avatar {
      float: left;
      width: 65px;
    }
    .chatInfo {
      float: right;
      width: 80%;
      .upper {
        display: flex;
        justify-content: space-between;
      }
      .lower {
        display: flex;
        justify-content: space-between;
      }
    }
    :hover {
      cursor: pointer;
      /* background-color: #f3e137; */
      background-color: #efefef;
    }
  }
`;

const BorderedAvatar = styled(Avatar)`
  border-radius: 30%;
  background-size: cover;
`;

const ChatList = () => {
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  //방 번호가 바뀔때마다 해당 방 메세지 받아오기

  const handleChatRoom = (chatId, username) => {
    dispatch(changeRoom(chatId));
    dispatch(setRoomName(username));
    chatState.socket.emit('join', { room: chatId });
    dispatch(setViewChatlist(false));
  };
  return (
    <>
      <ListContainer>
        {chatState.chatList.map((chat) => {
          return (
            <div className="listitem" key={chat.chatId} onClick={() => handleChatRoom(chat.chatId, chat.username)}>
              <div className="avatar">
                <BorderedAvatar
                  shape={'square'}
                  size={45}
                  src={<img src={chat.profileImg} style={{ objectFit: 'cover' }} />}
                />{' '}
              </div>
              <div className="chatInfo">
                <div className="upper">
                  <span>{chat.username} </span>
                  <span>
                    <Moment fromNow style={{ color: '#777777', fontSize: '0.7rem' }}>
                      {new Date(chat.lastCreate)}
                    </Moment>{' '}
                  </span>
                </div>
                <div className="lower">
                  <span style={{ color: '#777777', fontSize: '0.85rem' }}>{chat.lastMessage} </span>
                  <span>
                    <Badge count={chat.unreadMessageCount} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </ListContainer>
    </>
  );
};

export default ChatList;
