import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import { setIsChat } from '../../actions/chatAction';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MessageFilled } from '@ant-design/icons';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const FixDivStyle = styled.div`
  position: fixed;
  left: 85vw;
  top: 75vh;
`;

const Chatbutton = () => {
  const dispatch = useDispatch();
  const handleIsChat = () => {
    dispatch(setIsChat(true));
  };
  return (
    <FixDivStyle>
      <MessageFilled onClick={handleIsChat} style={{ fontSize: '80px', color: '#00BAEF' }} />
    </FixDivStyle>
  );
};

export default Chatbutton;
