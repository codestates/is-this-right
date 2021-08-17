import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { successLogIn, addUserInfo, successLogout } from '../actions/userActionIndex';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
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
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state.logIn, '로그인 상태입니다.');

  useEffect(async () => {
    let userInfo = await axios.get(`${url}/users`);
    if (userInfo) {
      dispatch(successLogIn());
      dispatch(addUserInfo(userInfo.data.data));
    }
  }, []);

  let handleClickHome = () => {
    history.push('/');
  };

  let handleLogOut = () => {
    axios.get(`${url}/signout`).then((ok) => {
      dispatch(successLogout());
      window.location.replace('/');
    });
  };
  return (
    <NavAreaStyle>
      <ContainerStlye>
        <div>
          <LogoStyle onClick={handleClickHome} src="../../imageFile/Logo_black.png" alt="" />
        </div>
        <DivStyle>
          <Link to="/AdviserList">
            <span style={{ marginLeft: '22%' }}>딴지꾼</span>
          </Link>
          <Link to="/">
            <span style={{ marginLeft: '10%' }}>마자?</span>
          </Link>
          {state.logIn ? (
            <>
              <Link to="/MyPage">
                <span style={{ marginLeft: '10%' }}>마이페이지</span>
              </Link>
              <span style={{ marginLeft: '10%' }} onClick={handleLogOut}>
                로그아웃
              </span>
            </>
          ) : (
            <Link to="/SignIn">
              <span style={{ marginLeft: '10%' }}>로그인</span>
            </Link>
          )}
        </DivStyle>
      </ContainerStlye>
    </NavAreaStyle>
  );
}

export default Nav;
