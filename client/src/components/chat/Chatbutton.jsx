import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import { setIsChat } from '../../actions/chatAction';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const FixDivStyle = styled.div`
  position: fixed;
  left: 85vw;
  top: 45vw;
`;
const ButtonStyle = styled.div`
  width: 8vh;
  height: 8vh;
  background-color: brown;
  font-size: 20px;
  text-align: center;
  border-radius: 50%;
`;
const Chatbutton = () => {
  const dispatch = useDispatch();
  const handleIsChat = () => {
    dispatch(setIsChat(true));
  };
  return (
    <FixDivStyle>
      <ButtonStyle onClick={handleIsChat}> 채팅</ButtonStyle>
    </FixDivStyle>
  );
};

export default Chatbutton;
