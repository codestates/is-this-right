import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import QuestionList from './components/QuestionList';
import AdviserList from './components/AdviserList';

const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
}
body {
    box-sizing: border-box;
  }
`;

const Body = styled.div`
  /* flex: ; */
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Body>
      <GlobalStyle />
      <Switch>
        <Route exact={true} path="/">
          <NavBar />
          <QuestionList />
        </Route>
        <Route path="/adviser">
          <NavBar />
          <AdviserList />
        </Route>
        <Route path="/ho">
          <LogIn />
        </Route>
      </Switch>
      <Footer />
    </Body>
  );
}

export default App;
