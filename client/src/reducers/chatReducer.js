import { chatInitialState } from './initialState';
import {
  UPDATE_CHAT_LIST,
  CHANGE_ROOM,
  SET_SOCKET,
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_ISCHAT,
  SET_VIEWCHATLIST,
  SET_NEWMESSAGES,
} from '../actions/chatAction';

const chatReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_LIST:
      return Object.assign({}, state, {
        chatList: [...action.payload],
      });
    case CHANGE_ROOM:
      return Object.assign({}, state, {
        currentRoom: action.payload,
      });
    case SET_SOCKET:
      return Object.assign({}, state, {
        socket: action.payload,
      });
    case SET_MESSAGES:
      return Object.assign({}, state, {
        messages: [...action.payload],
      });
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload],
      });
    case SET_ISCHAT:
      return Object.assign({}, state, {
        isChat: action.payload,
      });
    case SET_VIEWCHATLIST:
      return Object.assign({}, state, {
        viewChatlist: action.payload,
      });
    case SET_NEWMESSAGES:
      return Object.assign({}, state, {
        newMessages: action.payload,
      });
    default:
      return state;
  }
};

export default chatReducer;
