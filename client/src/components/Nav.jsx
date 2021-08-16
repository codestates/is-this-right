import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavAreaStyle = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  /* @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  } */
`;
const ContainerStlye = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  /* background-color: ; */
`;

const DivStyle = styled.div`
  /* flex: 1 1 auto; */
  color: black;
  font-size: 15px;
  width: 220px;
`;

const LogoStyle = styled.img`
  width: 150px;
  /* margin-left: 40%; */
`;

function Nav() {
  const state = useSelector((state) => state.userReducer);
  console.log(state.logIn, '로그인 상태입니다.');
  return (
    <NavAreaStyle>
      <ContainerStlye>
        <div>
          <Link to="/">
            <LogoStyle src="../../imageFile/Logo_black.png" alt="" />
          </Link>
        </div>
        <DivStyle>
          <Link to="/AdviserList">
            <span style={{ marginLeft: '22%' }}>딴지꾼</span>
          </Link>
          <Link to="/">
            <span style={{ marginLeft: '10%' }}>마자?</span>
          </Link>
          <Link to="/SignIn">
            {state.logIn ? (
              <span style={{ marginLeft: '10%' }}>마이페이지</span>
            ) : (
              <span style={{ marginLeft: '10%' }}>로그인</span>
            )}
          </Link>
        </DivStyle>
      </ContainerStlye>
    </NavAreaStyle>
  );
}

export default Nav;
