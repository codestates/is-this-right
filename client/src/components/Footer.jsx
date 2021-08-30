import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';

const FooterAreaStyle = styled.div`
  background-color: #26272b;
  padding: 15px 0 15px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  align-self: center;
  .divider {
    width: 80vw;
    border-bottom: 1px solid rgb(187, 187, 187, 0.5);
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
  .teamSection {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .name {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    a {
      text-decoration: none;
    }
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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Created by</div>
      <div className="teamSection">
        <a href="https://github.com/byungmin12">
          <div className="name">
            <GitHubIcon /> 김병민
          </div>
        </a>
        <a href="https://github.com/shpk93">
          <div className="name">
            <GitHubIcon /> 박상현
          </div>
        </a>
        <a href="https://github.com/HunKimADev">
          <div className="name">
            <GitHubIcon /> 김상훈
          </div>
        </a>
      </div>
      <div className="divider" />

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        Copyright &copy; 2021 All Rights Reserved by
        <SocialIconStyle>
          <a href="https://github.com/codestates/is-this-right">TEAM SMS.</a>
        </SocialIconStyle>
      </div>
    </FooterAreaStyle>
  );
}

export default Footer;
