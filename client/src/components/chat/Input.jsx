import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  min-height: 80px;
  border-top: 1px solid #eeeeee;
  border-radius: 0 0 10px 10px;

  @media ${(props) => props.theme.mobile} {
    border-radius: 0 0 0 0;
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
    color: #fff !important;
    text-transform: uppercase;
    background: #2979ff;
    padding: 20px;
    display: flex;
    min-width: 100px;
    border-radius: 0 0 10px 0;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
    :hover {
      background: #0859e6;
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
      <span>Send</span>
    </div>
    <div className="blank"></div>
  </StyledForm>
);

export default Input;
