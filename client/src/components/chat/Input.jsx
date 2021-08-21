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
    text-decoration: none;
    background: #2979ff;
    padding: 20px;
    display: inline-block;
    border: none;
    min-width: 100px;
    border-radius: 0 0 10px 0;

    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
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
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </StyledForm>
);

export default Input;
