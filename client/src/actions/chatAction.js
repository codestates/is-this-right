export const CHANGE_ROOM = 'CHANGE_ROOM';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
export const SET_SOCKET = 'SET_SOCKET';

export const changeRoom = (chatId) => {
  return {
    type: CHANGE_ROOM,
    payload: chatId,
  };
};

export const updateChatList = (chatList) => {
  return {
    type: UPDATE_CHAT_LIST,
    payload: chatList,
  };
};

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};
