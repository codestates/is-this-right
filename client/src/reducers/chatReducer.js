import { chatInitialState } from './initialState';
import { UPDATE_CHAT_LIST, CHANGE_ROOM, SET_SOCKET, SET_MESSAGES, ADD_MESSAGE } from '../actions/chatAction';

const userReducer = (state = chatInitialState, action) => {
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
    default:
      return state;
  }
};

export default userReducer;