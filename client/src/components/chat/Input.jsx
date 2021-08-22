import React from 'react';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';

const StyledForm = styled.form`
  display: flex;
  min-height: 80px;
  border-top: 1px solid #eeeeee;
  border-radius: 0 0 10px 10px;

  @media ${(props) => props.theme.mobile} {
    border-radius: 0 0 0 0;
    width: 100%;
    bottom: 0;
  }
  .input {
    border: none;
    padding: 5%;
    width: 100%;
    font-size: 1.2em;
    border-radius: 0 0 0 10px;

    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  .sendButton {
    color: #fff;
    text-transform: uppercase;
    background: linear-gradient(60deg, #023e8a, #0077b6);
    padding: 20px;
    display: flex;
    min-width: 100px;
    border-radius: 0 0 10px 0;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    span {
      display: flex;
      align-items: center;
    }
    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
    :hover {
      background: #023e8a;
    }
  }
`;
const Input = ({ setMessage, sendMessage, message }) => (
  <StyledForm>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <div className="sendButton" onClick={(e) => sendMessage(e)}>
      <span>
        <SendOutlined />
      </span>
    </div>
    <div className="blank"></div>
  </StyledForm>
);

export default Input;
