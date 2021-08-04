import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavAreaStyle = styled.div`
  width: 100%;
  height: 10%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    background-color: yellow;
    justify-content: center;
  }
`;

const ResAreaStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 780px;
  @media ${(props) => props.theme.mobile} {
    background-color: yellow;
    position: fixed;
    bottom: 3%;
    /* display: flex; */
    width: 100%;
    height: 10%;
    justify-content: space-around;
    align-items: center;
  }
`;

const LogInAreaStyle = styled.div`
  /* margin-left: 30vw; */
  /* padding: 100px; */
  @media ${(props) => props.theme.mobile} {
    display: flex;
    justify-content: center;
    width: 35%;
    /* margin-right: 12px; */
  }
`;

const ButtonStlye = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100px;
  @media ${(props) => props.theme.mobile} {
    width: 65%;
  }
`;

function NavBar() {
  return (
    <>
      <NavAreaStyle>
        <div>로고</div>
        <ResAreaStyle>
          <ButtonStlye>
            <Link to="/">
              <div>버튼</div>
            </Link>
            <Link to="/adviser">
              <div>버튼</div>
            </Link>
          </ButtonStlye>
          <LogInAreaStyle>
            <Link to="/ho">
              <div>로그인</div>
            </Link>
          </LogInAreaStyle>
        </ResAreaStyle>
      </NavAreaStyle>
    </>
  );
}

export default NavBar;
