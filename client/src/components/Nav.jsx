import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavAreaStyle = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f5f5f5;
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  /* @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  } */
`;

const DivStyle = styled.div`
  flex: 1 1 auto;
  color: black;
  font-size: 15px;
`;

const LogoStyle = styled.img`
  width: 150px;
  margin-left: 40%;
`;

function Nav() {
  return (
    <NavAreaStyle>
      <div style={{ flex: '1 1 auto' }}>
        <LogoStyle src="../../imageFile/Logo_black.png" alt="" />
      </div>
      <DivStyle>
        <span style={{ marginLeft: '22%' }}>딴지꾼</span>
        <span style={{ marginLeft: '10%' }}>마자?</span>
        <Link to="/SignIn">
          <span style={{ marginLeft: '10%' }}>로그인</span>
        </Link>
      </DivStyle>
    </NavAreaStyle>
  );
}

export default Nav;
