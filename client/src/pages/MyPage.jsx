import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AvatarCompo from '../components/myPage/AvatarCompo';
import UserPostListCompo from '../components/myPage/UserPostListCompo';
import UserEditCompo from '../components/myPage/UserEditCompo';

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MyPage() {
  const state = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!state.logIn) {
      window.location.replace('/');
    }
  }, []);
  return (
    <BodyAreaStyle>
      <ContainerStlye>
        <AvatarCompo />
        <Route exact path="/MyPage">
          <UserPostListCompo />
        </Route>
        <Route exact path="/MyPage/MyPostPage">
          <UserPostListCompo />
        </Route>
        <Route path="/MyPage/UserEditPage">
          <UserEditCompo />
        </Route>
      </ContainerStlye>
    </BodyAreaStyle>
  );
}

export default MyPage;
