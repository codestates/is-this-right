import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingCircleAni = keyframes`
    0%{stroke-dashoffset: 70%;}
    75%{stroke-dashoffset: 5%;}
    100%{stroke-dashoffset: 70%;}

`;

const loadingSpin = keyframes`
    100% {transform: rotate(360deg)}
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: white;
  opacity: 1;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .loading-circle {
    height: 100%;
    animation: ${loadingSpin} 3s infinite;
    > circle {
      stroke: black;
      stroke-width: 11;
      fill: none;
      stroke-dasharray: 70%;
      stroke-dashoffset: 0;
      animation: ${loadingCircleAni} 0.7s infinite;
    }
  }
`;

function LoadingCircle() {
  return (
    <Loading>
      <svg className="loading-circle">
        <circle cx="50%" cy="50%" r="100"></circle>
      </svg>
    </Loading>
  );
}

export default LoadingCircle;
