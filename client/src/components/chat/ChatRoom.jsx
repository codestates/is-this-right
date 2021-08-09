import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatRoom = ({ chatClick, userInfo, changeRoom }) => {
  const [chatlist, SetChatList] = useState([]);
  const [currentRoom, SetcurrentRoom] = useState(null);
  useEffect(() => {
    let getChatlist = async () => {
      let list = await axios.get('http://localhost:80/chats');
      SetChatList(list.data);
    };
    getChatlist();
  }, []);

  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     console.log('클라 메세지 받기', console.log(message));

  //     setMessages((messages) => [...messages, message]);
  //   });
  // }, []);

  return (
    <>
      <div onClick={chatClick}>채팅룸입니다</div>
      {chatlist
        ? chatlist.map((list2) => {
            return (
              <div key={list2.chatId}>
                <div>{list2.chatId}번 방입니다.</div>
                <button onClick={() => changeRoom(list2.chatId)}>클릭</button>
              </div>
            );
          })
        : null}
    </>
  );
};

export default ChatRoom;
