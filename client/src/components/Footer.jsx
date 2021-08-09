import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Divider } from 'antd';

const FooterAreaStyle = styled.div`
  background-color: #26272b;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: ; */
  & hr {
    width: 80vw;
    border-top-color: #bbb;
    opacity: 0.5;
  }
  & h6 {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 5px;
    letter-spacing: 2px;
  }
  & a {
    color: #737373;
    :hover {
      color: #3366cc;
      text-decoration: none;
    }
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const SocialIconStyle = styled.div`
  text-align: right;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-bottom: 4px;
  &a {
    background-color: #eceeef;
    color: #818a91;
    font-size: 16px;
    display: inline-block;
    line-height: 44px;
    width: 44px;
    height: 44px;
    text-align: center;
    margin-right: 8px;
    border-radius: 100%;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;

    ::active,
    :focus,
    :hover {
      color: #fff;
      background-color: #29aafe;
    }
  }
`;

function Footer() {
  return (
    <FooterAreaStyle>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <h6>About</h6>

        <h6>Categories</h6>

        <h6>Quick Links</h6>
      </div>

      <hr></hr>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        Copyright &copy; 2021 All Rights Reserved by
        <a href="">TEAM SMS</a>.
        <SocialIconStyle>
          <a href="https://github.com/codestates/is-this-right">
            <GitHubIcon />
          </a>
        </SocialIconStyle>
      </div>
    </FooterAreaStyle>
  );
}

export default Footer;
