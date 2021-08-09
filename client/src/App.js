import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import QuestionListPage from './pages/QuestionListPage';
import SignInPage from './pages/SignInPage';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Nav />
        <QuestionListPage />
        <Footer />
      </Route>
      <Route path="/SignIn">
        <SignInPage />
      </Route>
    </Switch>
  );
}

export default App;
