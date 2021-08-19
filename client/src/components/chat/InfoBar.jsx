import React from 'react';
import { setIsChat, setViewChatlist, changeRoom } from '../../actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import './styles/InfoBar.css';

const InfoBar = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chatReducer);
  const handleIsChat = () => {
    dispatch(setIsChat(false));
    dispatch(setViewChatlist(true));
    chatState.socket.emit('quitRoom');
    dispatch(changeRoom(null));
  };
  const handleChatlist = () => {
    dispatch(setViewChatlist(true));
    chatState.socket.emit('quitRoom');
    dispatch(changeRoom(null));
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <span onClick={handleChatlist}>{'<'}</span>
        <h3></h3>
      </div>
      <div className="rightInnerContainer">
        <button onClick={handleIsChat}>X</button>
      </div>
    </div>
  );
};

export default InfoBar;
