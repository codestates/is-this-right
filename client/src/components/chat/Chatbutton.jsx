import React, { useState, useEffect } from 'react';
import { setIsChat } from '../../actions/chatAction';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Badge } from 'antd';
import { MessageFilled } from '@ant-design/icons';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const FixDivStyle = styled.div`
  position: fixed;
  left: 88vw;
  top: 68vh;
  z-index: 999;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
  :hover svg {
    color: rgba(0, 119, 182, 0.9);
    transition: 0.1s;
  }
`;

const Chatbutton = () => {
  const chatState = useSelector((state) => state.chatReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleIsChat = () => {
    dispatch(setIsChat(true));
  };
  return (
    <>
      {userState.logIn ? (
        <FixDivStyle>
          <Badge count={chatState.newMessages}>
            <MessageFilled onClick={handleIsChat} style={{ fontSize: '75px', color: '#0077B6' }} />
          </Badge>
        </FixDivStyle>
      ) : null}
    </>
  );
};

export default Chatbutton;
