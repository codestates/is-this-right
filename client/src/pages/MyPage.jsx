import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BodyAreaStyle, ContainerStlye } from '../style/pageStyle';
import AvatarCompo from '../components/myPage/AvatarCompo';
import UserPostListCompo from '../components/myPage/UserPostListCompo';
import UserEditCompo from '../components/myPage/UserEditCompo';
import { setViewChatlist, setIsChat, setMessages, changeRoom } from '../actions/chatAction';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ContainnerStyleRed = styled(ContainerStlye)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20vw;
  padding-right: 20vw;
  width: 100%;
  height: 100%;
  @media ${(props) => props.theme.avatar} {
    margin-bottom: 12vh;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

function MyPage() {
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    //챗 초기화
    dispatch(setViewChatlist(true));
    dispatch(setIsChat(false));
    if (chatState.socket) {
      chatState.socket.emit('quitRoom');
    }
    dispatch(setMessages([]));
  }, []);
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
