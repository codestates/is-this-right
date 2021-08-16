import { chatInitialState } from './initialState';
import { UPDATE_CHAT_LIST, CHANGE_ROOM, SET_SOCKET } from '../actions/chatAction';

const userReducer = (state = chatInitialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case UPDATE_CHAT_LIST:
      newState.chatList = [...action.payload];
      return newState;
    case CHANGE_ROOM:
      newState.currentRoom = action.payload;
      return newState;
    case SET_SOCKET:
      newState.socket = action.payload;
      return newState;
    default:
      return newState;
  }
};

export default userReducer;
