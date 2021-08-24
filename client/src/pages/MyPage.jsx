import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AvatarCompo from '../components/myPage/AvatarCompo';
import UserPostListCompo from '../components/myPage/UserPostListCompo';
import UserEditCompo from '../components/myPage/UserEditCompo';

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContainnerStyleRed = styled(ContainerStlye)`
  @media ${(props) => props.theme.avatar} {
    margin-bottom: 170px;
    display: flex;
    flex-direction: column;
  }
`;

function MyPage() {
  const state = useSelector((state) => state.userReducer);

  return (
    <BodyAreaStyle>
      <ContainnerStyleRed>
        <AvatarCompo />
        <Route exact path="/MyPage">
          <UserPostListCompo />
        </Route>
        <Route path="/MyPage/MyPostPage">
          <UserPostListCompo />
        </Route>
        <Route path="/MyPage/UserEditPage">
          <UserEditCompo />
        </Route>
      </ContainnerStyleRed>
    </BodyAreaStyle>
  );
}

export default MyPage;
