export const CHANGE_ROOM = 'CHANGE_ROOM';
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
export const SET_SOCKET = 'SET_SOCKET';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_ISCHAT = 'SET_ISCHAT';
export const SET_VIEWCHATLIST = 'SET_VIEWCHATLIST';
export const SET_NEWMESSAGES = 'SET_NEWMESSAGES';

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

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
};

export const setIsChat = (boolean) => {
  return {
    type: SET_ISCHAT,
    payload: boolean,
  };
};

export const setViewChatlist = (boolean) => {
  return {
    type: SET_VIEWCHATLIST,
    payload: boolean,
  };
};

export const setNewMessages = (count) => {
  return {
    type: SET_NEWMESSAGES,
    payload: count,
  };
};
