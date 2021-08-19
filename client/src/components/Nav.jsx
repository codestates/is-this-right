import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { successLogIn, addUserInfo, successLogout } from '../actions/userActionIndex';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const NavAreaStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #00baef;
  box-shadow: rgba(163, 163, 163, 0.62) 0px 5px 5px 0px;
  > img {
    width: 150px;

    @media ${(props) => props.theme.mobile} {
      margin: 0 auto;
    }
  }
`;
const ContainerStlye = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

const DivStyle = styled.ul`
  color: black;
  font-size: 15px;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding: 0;

  > li {
    padding: 8px 12px;
  }

  @media ${(props) => props.theme.mobile} {
    background-color: #c2c2c2;
    opacity: 0.5;
    border-radius: 20px;
    height: 100px;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
const SpanStyle = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const LinkStyle = styled(Link)`
  text-decoration-line: none;
  color: black;

  :hover {
    color: black;
  }
`;

function Nav() {
  // const [scroll, setScroll] = useState('');
  // const scrollRef = useRef()
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
    // window.addEventListener('scroll', handleScroll);
  }, []);

  // const handleScroll = () => {
  //   if (window.pageYOffset > 0) {
  //     if (!scroll) {
  //       setScroll('black');
  //     }
  //   } else {
  //     if (scroll) {
  //       setScroll('#00baef');
  //     }
  //   }
  // };

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
      {/* <ContainerStlye> */}
      <img onClick={handleClickHome} src="../../imageFile/Logo_black.png" alt="" />
      <DivStyle>
        <li>
          <LinkStyle to="/AdviserList">
            <SpanStyle>딴지꾼</SpanStyle>
          </LinkStyle>
        </li>
        <li>
          <LinkStyle to="/">
            <SpanStyle>마자?</SpanStyle>
          </LinkStyle>
        </li>

        {state.logIn ? (
          <>
            <li>
              <LinkStyle to="/MyPage">
                <SpanStyle>마이페이지</SpanStyle>
              </LinkStyle>
            </li>
            <li>
              <SpanStyle onClick={handleLogOut}>로그아웃</SpanStyle>
            </li>
          </>
        ) : (
          <li>
            <LinkStyle to="/SignIn">
              <SpanStyle>로그인</SpanStyle>
            </LinkStyle>
          </li>
        )}
      </DivStyle>
      {/* </ContainerStlye> */}
    </NavAreaStyle>
  );
}

export default Nav;
