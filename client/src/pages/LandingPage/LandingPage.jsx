import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import './Default.css';
import './Main.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styled, { keyframes } from 'styled-components';
import { Button, Spin } from 'antd';
import { BackTop } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleLanding, handleDisable } from '../../actions/userActionIndex';

const keyFramesAction = keyframes`
    0% {
      border-color: rgb(18, 99, 206);
      
  }
  50% {
    border-color: #cccccc;
  }
  100% {
    border-color: rgb(18, 99, 206);
  }
 
`;

const ButtonStyle = styled(Button)`
  width: 10vw;
  min-width: 200px;
  height: 5vh;
  margin: 1vw;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 10vh;
  }
`;

const ButtonToGoTopStyle = styled(Button)`
  width: 10vw;
  min-width: 200px;
  height: 5vh;
  margin: 1vw;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgb(18, 99, 206);
  font-weight: bold;
  font-size: 1.5rem;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 10vh;
  }

  animation: ${keyFramesAction} 1s 1s infinite;
`;

const NavStyle = styled(Nav)``;

const RotateSpan = styled.span`
  transform: rotate(20deg);
  -moz-transform: rotate(20deg);
  -webkit-transform: rotate(20deg);
  -o-transform: rotate(20deg);
`;

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const ref = useRef();
  let section0 = useRef();
  let section0A = useRef();
  let section0B = useRef();
  let section0C = useRef();
  let section0D = useRef();
  let videoCanvas0 = useRef();

  const section1 = useRef();
  const section1A = useRef();
  const section1B = useRef();
  const section1C = useRef();
  const section1D = useRef();
  const section1E = useRef();
  const section1F = useRef();
  // const section1G = useRef();
  const videoCanvas1 = useRef();

  const section2 = useRef();
  const section2A = useRef();
  const section2B = useRef();
  const section2C = useRef();
  const videoCanvas2 = useRef();

  const section3 = useRef();
  const userExplainSectionA = useRef();
  const userExplainTextA = useRef();
  const userExplainGifA = useRef();
  const userExplainTextB = useRef();

  const userExplainImgA = useRef();
  const userExplainCanvas = useRef();

  const section4 = useRef();
  const mentorExplainA = useRef();
  const mentorExplainB = useRef();
  const mentorExplainC = useRef();
  const mentorExplainD = useRef();
  const mentorExplainCTextAction = useRef();
  const mentorExplainCImgAction = useRef();
  const fixScreen = useRef();

  const goToAdviserListPage = () => {
    history.push('/');
  };

  let yOffset = 0;
  //window.pageYOffset ?????? ????????? ?????? => ?????? ????????? ????????? ??? ??? ??????
  // const [yOffset, setYOffset] = useState(0);
  let prevScrollHeight = 0; //?????? ????????? ??????(yOffset)?????? ????????? ????????? ????????? ???????????? ????????? ???????????? ???
  let currentScene = 0; //?????? ???????????? ???(scroll-section)
  let enterNewScene = false; //????????? ????????? true
  const sceneInfo = [
    {
      //0
      //????????? ?????? => ????????? ?????? ??????????????? ????????? ?????????
      //0?????? ??? ????????? ??????????????? ?????? ????????? ?????? ????????? ????????????
      // ??? ?????? height??? ????????? ????????????.
      scrollHeight: 0,
      heightNum: 4, //???????????? ????????? 5?????? scrollHeight ??????
      type: 'sticky', //?????? ???????????? ?????? ??????????????? ??????????????? ??????
      objs: {
        container: section0,
        messageA: section0A,
        messageB: section0B,
        messageC: section0C,
        messageD: section0D,
        canvas: videoCanvas0,
        conText: videoCanvas0,
        videoImages: [],
      },
      values: {
        //???
        videoImageCount: 315,
        imageSequence: [0, 314],
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.17 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.17 }],

        messageBOpacityIn: [0, 1, { start: 0.32, end: 0.39 }],
        messageBTranslateYIn: [20, 0, { start: 0.32, end: 0.39 }],

        messageCOpacityIn: [0, 1, { start: 0.52, end: 0.57 }],
        messageCTranslateYIn: [20, 0, { start: 0.52, end: 0.57 }],

        messageDOpacityIn: [0, 1, { start: 0.69, end: 0.8 }],
        messageDTranslateYIn: [20, 0, { start: 0.69, end: 0.8 }],

        //??????
        messageAOpacityOut: [1, 0, { start: 0.25, end: 0.3 }],
        messageATranslateYOut: [0, -20, { start: 0.25, end: 0.3 }],

        messageBOpacityOut: [1, 0, { start: 0.45, end: 0.5 }],
        messageBTranslateYOut: [0, -20, { start: 0.45, end: 0.5 }],

        messageCOpacityOut: [1, 0, { start: 0.64, end: 0.67 }],
        messageCTranslateYOut: [0, -20, { start: 0.64, end: 0.67 }],

        messageDOpacityOut: [1, 0, { start: 0.9, end: 0.95 }],
        messageDTranslateYOut: [0, -20, { start: 0.9, end: 0.95 }],
      },
    },
    {
      //1
      scrollHeight: 0,
      heightNum: 4,
      type: 'sticky',
      objs: {
        container: section1,
        messageA: section1A,
        messageB: section1B,
        messageC: section1C,
        messageD: section1D,
        messageE: section1E,
        messageF: section1F,
        // messageG: section1G,
        canvas: videoCanvas1,
        conText: videoCanvas1,
        videoImages: [],
      },
      values: {
        videoImageCount: 315,
        imageSequence: [0, 314],
        //???
        messageAOpacityIn: [0, 1, { start: 0, end: 0.05 }],
        messageATranslateYIn: [20, 0, { start: 0, end: 0.05 }],

        messageBOpacityIn: [0, 1, { start: 0.2, end: 0.23 }],
        messageBTranslateYIn: [20, 0, { start: 0.2, end: 0.23 }],

        messageCOpacityIn: [0, 1, { start: 0.35, end: 0.38 }],
        messageCTranslateYIn: [20, 0, { start: 0.35, end: 0.38 }],

        messageDOpacityIn: [0, 1, { start: 0.51, end: 0.55 }],
        messageDTranslateYIn: [20, 0, { start: 0.51, end: 0.55 }],

        messageEOpacityIn: [0, 1, { start: 0.67, end: 0.7 }],
        messageETranslateYIn: [20, 0, { start: 0.67, end: 0.7 }],

        messageFOpacityIn: [0, 1, { start: 0.82, end: 0.85 }],
        messageFTranslateYIn: [20, 0, { start: 0.82, end: 0.85 }],

        // messageGOpacityIn: [0, 1, { start: 0.81, end: 0.86 }],
        // messageGTranslateYIn: [20, 0, { start: 0.81, end: 0.86 }],

        //??????
        messageAOpacityOut: [1, 0, { start: 0.15, end: 0.18 }],
        messageATranslateYOut: [0, -20, { start: 0.15, end: 0.18 }],

        messageBOpacityOut: [1, 0, { start: 0.3, end: 0.33 }],
        messageBTranslateYOut: [0, -20, { start: 0.3, end: 0.33 }],

        messageCOpacityOut: [1, 0, { start: 0.46, end: 0.49 }],
        messageCTranslateYOut: [0, -20, { start: 0.46, end: 0.49 }],

        messageDOpacityOut: [1, 0, { start: 0.62, end: 0.65 }],
        messageDTranslateYOut: [0, -20, { start: 0.62, end: 0.65 }],

        messageEOpacityOut: [1, 0, { start: 0.78, end: 0.8 }],
        messageETranslateYOut: [0, -20, { start: 0.78, end: 0.8 }],

        messageFOpacityOut: [1, 0, { start: 0.95, end: 0.99 }],
        messageFTranslateYOut: [0, -20, { start: 0.95, end: 0.99 }],

        // messageGOpacityOut: [1, 0, { start: 0.87, end: 0.95 }],
        // messageGTranslateYOut: [0, -20, { start: 0.87, end: 0.95 }],
      },
    },
    {
      //2
      scrollHeight: 0,
      heightNum: 4,
      type: 'sticky',
      objs: {
        container: section2,
        messageA: section2A,
        messageB: section2B,
        messageC: section2C,
        canvas: videoCanvas2,
        conText: videoCanvas2,
        videoImages: [],
      },
      values: {
        videoImageCount: 315,
        imageSequence: [0, 314],
        canvas_opacity: [1, 0, { start: 0.94, end: 1 }],
        //???
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.15 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.15 }],

        messageBOpacityIn: [0, 1, { start: 0.27, end: 0.29 }],
        messageBTranslateYIn: [20, 0, { start: 0.27, end: 0.29 }],

        messageCOpacityIn: [0, 1, { start: 0.42, end: 0.45 }],
        // messageCTranslateYIn: [20, 0, { start: 0.42, end: 0.45 }],

        //??????
        messageAOpacityOut: [1, 0, { start: 0.2, end: 0.25 }],
        messageATranslateYOut: [0, -20, { start: 0.2, end: 0.25 }],

        messageBOpacityOut: [1, 0, { start: 0.35, end: 0.4 }],
        messageBTranslateYOut: [0, -20, { start: 0.35, end: 0.4 }],

        messageCOpacityOut: [1, 0, { start: 0.85, end: 0.92 }],
        // messageCTranslateYOut: [0, -20, { start: 0.85, end: 0.92 }],
      },
    },
    {
      //3
      scrollHeight: 0,
      heightNum: 5,
      type: 'sticky',
      objs: {
        container: section3,
        userExplainText: userExplainSectionA,

        userExplainTextA: userExplainTextA,
        userExplainImgA: userExplainImgA,
        userExplainGifA: userExplainGifA,
        userExplainTextB: userExplainTextB,
        canvas: userExplainCanvas,
        context: userExplainCanvas,
        imagePath: [],
      },
      values: {
        //???
        // messageAOpacityIn: [20, 0, { start: 0.1, end: 0.15 }],
        backgroundTranslateXLeftIn: [-100, 0, { start: 0, end: 0.05 }],
        backgroundOpacityLeftIn: [0, 1, { start: 0, end: 0.05 }],

        backgroundTranslateXIn: [0, 1, { start: 0.25, end: 0.35 }],
        backgroundOpacityIn: [0, 1, { start: 0.25, end: 0.35 }],

        backgroundOpacityRightIn: [0, 1, { start: 0.43, end: 0.5 }],
        backgroundTranslateXRightIn: [100, 0, { start: 0.43, end: 0.5 }],

        backgroundOpacityCenterIn: [0, 1, { start: 0.76, end: 0.8 }],

        //??????
        // messageAOpacityOut: [0, -20, { start: 0.2, end: 0.25 }],
        backgroundTranslateXLeftOut: [0, -100, { start: 0.2, end: 0.25 }],
        backgroundOpacityLeftOut: [1, 0, { start: 0.2, end: 0.25 }],

        backgroundTranslateXOut: [1, 0, { start: 0.42, end: 0.45 }],
        backgroundOpacityOut: [1, 0, { start: 0.42, end: 0.45 }],

        backgroundOpacityRightOut: [1, 0, { start: 0.65, end: 0.7 }],
        backgroundTranslateXRightOut: [0, 100, { start: 0.65, end: 0.7 }],

        backgroundOpacityCenterOut: [1, 0, { start: 0.9, end: 0.98 }],
      },
    },
    {
      //4
      scrollHeight: 0,
      heightNum: 6,
      type: 'sticky',
      objs: {
        container: section4,
        mentorExplainA: mentorExplainA,
        mentorExplainB: mentorExplainB,
        mentorExplainC: mentorExplainC,
        mentorExplainD: mentorExplainD,
        mentorExplainCTextAction: mentorExplainCTextAction,
        mentorExplainCImgAction: mentorExplainCImgAction,
      },
      values: {
        //???
        mentorTextOpacityIn: [0, 1, { start: 0, end: 0.02 }],
        mentorTextTranslateYIn: [20, 0, { start: 0, end: 0.02 }],

        mentorFeedbackExplainOpacityIn: [0, 1, { start: 0.1, end: 0.2 }],
        mentorFeedbackExplainTranslateIn: [-100, 0, { start: 0.1, end: 0.2 }],

        mentorExplainCTextActionOpacityIn: [0, 1, { start: 0.38, end: 0.5 }],
        mentorExplainCImgActionTranslateLeftIn: [-100, 0, { start: 0.38, end: 0.5 }],
        mentorExplainCImgActionTranslateRightIn: [100, 0, { start: 0.38, end: 0.5 }],

        mentorExplainDOpacityIn: [0, 1, { start: 0.68, end: 0.8 }],
        mentorExplainDTranslateIn: [100, 0, { start: 0.68, end: 0.8 }],

        //??????
        mentorTextOpacityOut: [1, 0, { start: 0.068, end: 0.08 }],
        mentorTextTranslateYOut: [0, -20, { start: 0.068, end: 0.08 }],

        mentorFeedbackExplainOpacityOut: [1, 0, { start: 0.32, end: 0.36 }],
        mentorFeedbackExplainTranslateOut: [0, -100, { start: 0.32, end: 0.36 }],

        mentorExplainCTextActionOpacityOut: [1, 0, { start: 0.62, end: 0.64 }],
        mentorExplainCImgActionTranslateLeftOut: [0, -100, { start: 0.62, end: 0.64 }],
        mentorExplainCImgActionTranslateRightOut: [0, 100, { start: 0.62, end: 0.64 }],

        mentorExplainDOpacityOut: [1, 0, { start: 0.9, end: 0.95 }],
        mentorExplainDTranslateOut: [0, 100, { start: 0.9, end: 0.95 }],
      },
    },
  ];

  const setCanvasImages = () => {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `../../../imageFile/0/${i + 1}.jpg`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
    let imgElem1;
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      imgElem1 = new Image();
      imgElem1.src = `../../../imageFile/1/${i + 316}.jpg`;
      sceneInfo[1].objs.videoImages.push(imgElem1);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image();
      imgElem2.src = `../../../imageFile/2/${i + 631}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }
    let imgElem3;
    imgElem3 = new Image();
    imgElem3.src = '../../../imageFile/team.png';
    sceneInfo[3].objs.imagePath.push(imgElem3);
  };

  setCanvasImages();

  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;

  let setLayout = useCallback(() => {
    yOffset = window.pageYOffset;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    for (let i = 0; i < sceneInfo.length; i++) {
      //??? ????????? ????????? ?????? ??????
      if (sceneInfo[i].objs.container.current) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.current.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
    }
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    if (ref.current) {
      ref.current.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (sceneInfo[0].objs.canvas.current) {
      sceneInfo[0].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
    }
    if (sceneInfo[1].objs.canvas.current) {
      sceneInfo[1].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
    }
    if (sceneInfo[2].objs.canvas.current) {
      sceneInfo[2].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
    }
  }, []);

  const calcValues = (values, currentYOffset) => {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      //????????? ?????? ????????? ??????????????? ??????
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  };
  let UseCallbackPlayAnimation = useCallback(() => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    console.log('??? ?????? ??????', objs);
    console.log('????????????', yOffset);
    console.log('?????? ??????', prevScrollHeight);
    console.log('?????? ????????? ??????', currentYOffset);
    console.log('????????? ??????', sceneInfo[currentScene].scrollHeight);
    console.log('????????? ?????? ???????????? ??????', scrollRatio);

    console.log(scrollRatio);

    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (objs.conText.current) {
          objs.conText.current
            .getContext('2d')
            .drawImage(objs.videoImages[sequence], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
        }
        if (scrollRatio <= 0.22) {
          if (objs.messageA.current) {
            objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
            objs.messageA.current.style.transform = `translateY(${calcValues(
              values.messageATranslateYIn,
              currentYOffset,
            )}%)`;
          }
        } else {
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
          objs.messageA.current.style.transform = `translateY(${calcValues(
            values.messageATranslateYOut,
            currentYOffset,
          )}%)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          if (objs.messageB.current) {
            objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
            objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
              values.messageBTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          if (objs.messageC.current) {
            objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
            objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
              values.messageCTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.85) {
          // in
          if (objs.messageD.current) {
            objs.messageD.current.style.opacity = calcValues(values.messageDOpacityIn, currentYOffset);
            objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
              values.messageDTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageD.current.style.opacity = calcValues(values.messageDOpacityOut, currentYOffset);
          objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
            values.messageDTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }
        break;

      case 1:
        let sequence1 = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (objs.conText.current) {
          objs.conText.current
            .getContext('2d')
            .drawImage(objs.videoImages[sequence1], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
        }
        if (scrollRatio <= 0.14) {
          // in
          if (objs.messageA.current) {
            objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
            objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
              values.messageATranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.28) {
          // in
          if (objs.messageB.current) {
            objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
            objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
              values.messageBTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          if (objs.messageC.current) {
            objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
            objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
              values.messageCTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.53) {
          // in
          if (objs.messageD.current) {
            objs.messageD.current.style.opacity = calcValues(values.messageDOpacityIn, currentYOffset);
            objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
              values.messageDTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageD.current.style.opacity = calcValues(values.messageDOpacityOut, currentYOffset);
          objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
            values.messageDTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.66) {
          // in
          if (objs.messageE.current) {
            objs.messageE.current.style.opacity = calcValues(values.messageEOpacityIn, currentYOffset);
            objs.messageE.current.style.transform = `translate3d(0, ${calcValues(
              values.messageETranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageE.current.style.opacity = calcValues(values.messageEOpacityOut, currentYOffset);
          objs.messageE.current.style.transform = `translate3d(0, ${calcValues(
            values.messageETranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.9) {
          // in
          if (objs.messageF.current) {
            objs.messageF.current.style.opacity = calcValues(values.messageFOpacityIn, currentYOffset);
            objs.messageF.current.style.transform = `translate3d(0, ${calcValues(
              values.messageFTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageF.current.style.opacity = calcValues(values.messageFOpacityOut, currentYOffset);
          objs.messageF.current.style.transform = `translate3d(0, ${calcValues(
            values.messageFTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        // if (scrollRatio <= 0.84) {
        //   // in
        //   objs.messageG.current.style.opacity = calcValues(values.messageGOpacityIn, currentYOffset);
        //   objs.messageG.current.style.transform = `translate3d(0, ${calcValues(
        //     values.messageGTranslateYIn,
        //     currentYOffset,
        //   )}%, 0)`;
        // } else {
        //   // out
        //   objs.messageG.current.style.opacity = calcValues(values.messageGOpacityOut, currentYOffset);
        //   objs.messageG.current.style.transform = `translate3d(0, ${calcValues(
        //     values.messageGTranslateYOut,
        //     currentYOffset,
        //   )}%, 0)`;
        // }
        break;

      case 2:
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        if (objs.conText.current) {
          objs.conText.current
            .getContext('2d')
            .drawImage(objs.videoImages[sequence2], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
          objs.conText.current.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        }
        if (scrollRatio <= 0.18) {
          // in
          if (objs.messageA.current) {
            objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
            objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
              values.messageATranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.3) {
          // in
          if (objs.messageB.current) {
            objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
            objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
              values.messageBTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          // out
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.8) {
          // in
          if (objs.messageC.current) {
            objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
          }
          // objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
          //   values.messageCTranslateYIn,
          //   currentYOffset,
          // )}%, 0)`;}
        } else {
          // out
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
          // objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
          //   values.messageCTranslateYOut,
          //   currentYOffset,
          // )}%, 0)`;
        }
        break;
      case 3:
        console.log(objs.userExplainTextA.current);
        //???????????? ?????? ??? ???????????? ?????? ?????? ??????

        const widthRatio = window.innerWidth / objs.canvas.current.width;
        const heightRatio = window.innerHeight / objs.canvas.current.height;
        let canvasScaleRatio = 0;
        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }
        if (objs.canvas.current) {
          objs.canvas.current.transform = `scale(${canvasScaleRatio})`;
          objs.canvas.current
            .getContext('2d')
            .drawImage(objs.imagePath[0], 0, 0, objs.canvas.current.width, objs.canvas.current.height);
        }
        if (scrollRatio <= 0.2) {
          if (objs.userExplainTextA.current) {
            objs.userExplainTextA.current.style.transform = `translate3d(${calcValues(
              values.backgroundTranslateXLeftIn,
              currentYOffset,
            )}%,0, 0)`;
            objs.userExplainTextA.current.style.opacity = calcValues(values.backgroundOpacityLeftIn, currentYOffset);
          }
        } else {
          objs.userExplainTextA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXLeftOut,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainTextA.current.style.opacity = calcValues(values.backgroundOpacityLeftOut, currentYOffset);
        }

        if (scrollRatio <= 0.35) {
          if (objs.userExplainImgA.current) {
            objs.userExplainImgA.current.style.color = 'black';
          }
        } else {
          objs.userExplainImgA.current.style.color = 'white';
        }

        if (scrollRatio <= 0.25) {
          if (objs.userExplainImgA.current) {
            objs.userExplainImgA.current.style.opacity = calcValues(values.backgroundOpacityIn, currentYOffset);
            objs.userExplainImgA.current.style.transform = `translate3d(0, ${calcValues(
              values.backgroundTranslateXIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          objs.userExplainImgA.current.style.opacity = calcValues(values.backgroundOpacityOut, currentYOffset);
          objs.userExplainImgA.current.style.transform = `translate3d(0, ${calcValues(
            values.backgroundTranslateXOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.66) {
          if (objs.userExplainGifA.current) {
            objs.userExplainGifA.current.style.transform = `translate3d(${calcValues(
              values.backgroundTranslateXRightIn,
              currentYOffset,
            )}%,0, 0)`;
            objs.userExplainGifA.current.style.opacity = calcValues(values.backgroundOpacityRightIn, currentYOffset);
          }
        } else {
          objs.userExplainGifA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXRightOut,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainGifA.current.style.opacity = calcValues(values.backgroundOpacityRightOut, currentYOffset);
        }

        if (scrollRatio <= 0.76) {
          if (objs.userExplainTextB.current) {
            objs.userExplainTextB.current.style.opacity = calcValues(values.backgroundOpacityCenterIn, currentYOffset);
          }
        } else {
          objs.userExplainTextB.current.style.opacity = calcValues(values.backgroundOpacityCenterOut, currentYOffset);
        }
        console.log(calcValues(sceneInfo[4].values.mentorTextOpacityOut, currentYOffset));

        break;
      case 4:
        if (scrollRatio <= 0.05) {
          //           sceneInfo[4].objs;
          // sceneInfo[4].values;
          if (objs.mentorExplainA.current) {
            objs.mentorExplainA.current.style.opacity = calcValues(values.mentorTextOpacityIn, currentYOffset);
            objs.mentorExplainA.current.style.transform = `translate3d(0, ${calcValues(
              values.mentorTextTranslateYIn,
              currentYOffset,
            )}%, 0)`;
          }
        } else {
          objs.mentorExplainA.current.style.opacity = calcValues(values.mentorTextOpacityOut, currentYOffset);
          objs.mentorExplainA.current.style.transform = `translate3d(0, ${calcValues(
            values.mentorTextTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio <= 0.25) {
          if (objs.mentorExplainB.current) {
            objs.mentorExplainB.current.style.opacity = calcValues(
              values.mentorFeedbackExplainOpacityIn,
              currentYOffset,
            );
            objs.mentorExplainB.current.style.transform = `translate3d( ${calcValues(
              values.mentorFeedbackExplainTranslateIn,
              currentYOffset,
            )}%,0, 0)`;
          }
        } else {
          objs.mentorExplainB.current.style.opacity = calcValues(
            values.mentorFeedbackExplainOpacityOut,
            currentYOffset,
          );
          objs.mentorExplainB.current.style.transform = `translate3d(${calcValues(
            values.mentorFeedbackExplainTranslateOut,
            currentYOffset,
          )}%,0,  0)`;
        }
        if (scrollRatio <= 0.51) {
          if (mentorExplainCTextAction.current) {
            mentorExplainCTextAction.current.style.opacity = calcValues(
              values.mentorExplainCTextActionOpacityIn,
              currentYOffset,
            );
            mentorExplainCTextAction.current.style.transform = `translate3d(${calcValues(
              values.mentorExplainCImgActionTranslateLeftIn,

              currentYOffset,
            )}%,0, 0)`;

            mentorExplainCImgAction.current.style.opacity = calcValues(
              values.mentorExplainCTextActionOpacityIn,
              currentYOffset,
            );
            mentorExplainCImgAction.current.style.transform = `translate3d(${calcValues(
              values.mentorExplainCImgActionTranslateRightIn,

              currentYOffset,
            )}%,0, 0)`;
          }
        } else {
          mentorExplainCTextAction.current.style.opacity = calcValues(
            values.mentorExplainCTextActionOpacityOut,
            currentYOffset,
          );
          objs.mentorExplainCTextAction.current.style.transform = `translate3d(${calcValues(
            values.mentorExplainCImgActionTranslateLeftOut,
            currentYOffset,
          )}%, 0,0)`;

          objs.mentorExplainCImgAction.current.style.opacity = calcValues(
            values.mentorExplainCTextActionOpacityOut,
            currentYOffset,
          );
          objs.mentorExplainCImgAction.current.style.transform = `translate3d(${calcValues(
            values.mentorExplainCImgActionTranslateRightOut,

            currentYOffset,
          )}%,0, 0)`;
        }
        if (scrollRatio <= 0.8) {
          if (objs.mentorExplainD.current) {
            objs.mentorExplainD.current.style.opacity = calcValues(values.mentorExplainDOpacityIn, currentYOffset);
            objs.mentorExplainD.current.style.transform = `translate3d( ${calcValues(
              values.mentorExplainDTranslateIn,
              currentYOffset,
            )}%,0, 0)`;
          }
        } else {
          objs.mentorExplainD.current.style.opacity = calcValues(values.mentorExplainDOpacityOut, currentYOffset);
          objs.mentorExplainD.current.style.transform = `translate3d( ${calcValues(
            values.mentorExplainDTranslateOut,
            currentYOffset,
          )}%,0, 0)`;
        }
        break;
    }
  }, []);

  const scrollLoop = useCallback(() => {
    // console.log(currentScene);
    // console.log(sceneInfo[currentScene].scrollHeight);
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
        ref.current.setAttribute('id', `show-scene-${currentScene}`);
      }
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      if (ref.current) {
        ref.current.setAttribute('id', `show-scene-${currentScene}`);
      }
    }

    if (enterNewScene) return;

    UseCallbackPlayAnimation();
  }, []);

  let setScrollHeight = useCallback(() => {
    yOffset = window.pageYOffset;
    scrollLoop();
  }, []);
  // window.addEventListener('resize', setLayout);
  // window.addEventListener('load', setLayout);

  const handleLoading = () => {
    setIsLoading(false);
  };

  const testFunc = () => {
    let temYOffset = window.pageYOffset;
    let temScrollCount = 0;
    if (temYOffset > 0) {
      let siId = setInterval(() => {
        window.scrollTo(0, temYOffset);
        temYOffset += 5;
        console.log(window.pageYOffset);
        if (temScrollCount > 20) {
          clearInterval(siId);
        }
        temScrollCount++;
      }, 20);
    }
    setLayout();
    sceneInfo[0].objs.conText.current
      .getContext('2d')
      .drawImage(sceneInfo[0].objs.videoImages[0], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
    handleLoading();
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(handleLanding());
    window.addEventListener('load', () => {
      let temYOffset = window.pageYOffset;
      let temScrollCount = 0;
      if (temYOffset > 0) {
        let siId = setInterval(() => {
          window.scrollTo(0, temYOffset);
          temYOffset += 5;
          console.log(window.pageYOffset);
          if (temScrollCount > 20) {
            clearInterval(siId);
          }
          temScrollCount++;
        }, 20);
      }

      setLayout();
      if (sceneInfo[0].objs.conText.current) {
        sceneInfo[0].objs.conText.current
          .getContext('2d')
          .drawImage(sceneInfo[0].objs.videoImages[0], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
      }
      setIsLoading(false);
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', setScrollHeight);
    if (state.disableBack) {
      setIsLoading(false);
    }

    return () => {
      dispatch(handleDisable());
      // window.removeEventListener('load', setLayout);
      window.removeEventListener('resize', setLayout);
      window.removeEventListener('scroll', setScrollHeight);
      setLayout = () => {};
      setScrollHeight = () => {};
      UseCallbackPlayAnimation = () => {};
    };
  }, []);

  const goUserExplainSection = () => {
    const location = userExplainTextA.current.offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };

  const goMentorExplainSection = () => {
    const location = section4.current.offsetTop;
    window.scrollTo({ top: location + 200, behavior: 'smooth' });
  };

  const gotoTop = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    history.push('/');
  };

  if (isLoading) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="???????????? ???????????? ????????????."></Spin>
      </div>
    );
  }

  return (
    <div className="body" ref={ref} onLoad={testFunc}>
      <BackTop>
        <div
          style={{
            height: 60,
            width: 60,
            lineHeight: '40px',
            border: '2px solid #1263CE',
            borderRadius: 10,
            color: '#1263CE',
            fontSize: 18,
            fontWeight: 'bold',
            verticalAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <span>UP</span>
        </div>
      </BackTop>
      <NavStyle landing="landing" />
      <section className="scroll-section" id="scroll-section-0" ref={section0}>
        <h1>
          ????????????<span className="logo-rotate">?</span>
        </h1>
        {/* <h2>Is this right?</h2> */}
        <div className="buttonSection">
          <ButtonStyle onClick={goMentorExplainSection}>for Mentor</ButtonStyle>
          <ButtonStyle onClick={goUserExplainSection}>for User</ButtonStyle>
        </div>
        <div class="container">
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
        </div>
        <div className="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-0" width={canvasWidth} height={canvasHeight} ref={videoCanvas0}></canvas>
        </div>
        <div className="sticky-elem main-message a" ref={section0A}>
          <p>
            ????????? ?????? ?????? <br />
            ???????????? ??????
          </p>
        </div>
        <div className="sticky-elem main-message b" ref={section0B}>
          <p>
            <p>
              ????????? ?????? ??? ??????
              <br />
              ???????????? ??????
            </p>
          </p>
        </div>
        <div className="sticky-elem main-message c" ref={section0C}>
          <p>
            ????????? ?????? ?????? <br />
            ????????? ????????? ??? ?????? <br />
            ?????? ????????? ????????????
          </p>
        </div>
        <div className="sticky-elem main-message d" ref={section0D}>
          <p>
            <span style={{ fontFamily: 'font-css' }}>
              ????????????<span className="logo-rotate">?</span>
            </span>
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-1" ref={section1}>
        <div className="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-1" width={canvasWidth} height={canvasHeight} ref={videoCanvas1}></canvas>
        </div>
        <div className="sticky-elem main-message a" ref={section1A}>
          <p>
            ?????? ???<br />
            ?????? ?????? <br />
            ????????? ????????? <br />
            ??????
          </p>
        </div>
        <div className="sticky-elem main-message b" ref={section1B}>
          <p>
            ?????? ????????? ??????
            <br />
            ???????????? ??????
          </p>
        </div>
        <div className="sticky-elem main-message c" ref={section1C}>
          <p>
            ?????? ????????? ????????????
            <br />
            ???????????? ??????
          </p>
        </div>
        <div className="sticky-elem main-message d" ref={section1D}>
          <p>
            ?????? ?????????????????? ??????
            <br />
          </p>
        </div>
        <div className="sticky-elem main-message e" ref={section1E}>
          <p>?????? ????????? ????????????</p>
        </div>
        <div className="sticky-elem main-message f" ref={section1F}>
          <p>
            <span style={{ fontFamily: 'font-css' }}>
              ????????????<span className="logo-rotate">?</span>
            </span>
          </p>
        </div>
        {/* <div className="sticky-elem main-message g" ref={section1G}>
          <p>
            ??????????????? <br /> ??? ??? ????????? ?????? <br />?????? ?????????????????? ????????????????
          </p>
        </div> */}
      </section>
      <section className="scroll-section" id="scroll-section-2" ref={section2}>
        <div className="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-2" width={canvasWidth} height={canvasHeight} ref={videoCanvas2}></canvas>
        </div>
        <div className="sticky-elem main-message a3" ref={section2A}>
          <p>
            <small>?????? ?????? ??? ?????? ?????? ?????? ???...</small>
            <br />
            <strong>?????? ??????</strong>
          </p>
        </div>
        <div className="sticky-elem main-message b3" ref={section2B}>
          <p>
            <strong>?????????</strong>???
          </p>
          <p>??????????????????.</p>
        </div>
        <div className="sticky-elem main-message c3" ref={section2C}>
          <p>
            <h1>
              ????????????<span className="logo-rotate">?</span>
            </h1>
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-3" ref={section3}>
        <div className="explain-messageA">
          <div className="animation textA" ref={userExplainTextA}>
            <div className="mini-TextA-Section a">
              <p style={{ marginTop: '45vh' }}>
                <strong>????????????</strong> <br />
                ????????? ?????? ????????????
                <br />
                ?????? ????????? ??????????????? <br />
                ??????????????? <br />
              </p>
              <img
                style={{ marginTop: '45vh' }}
                className="gifFile"
                src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%E1%84%8C%E1%85%B5%E1%86%AF%E1%84%86%E1%85%AE%E1%86%AB%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5.gif"
                alt=""
              />
            </div>
          </div>
          <div className="sticky-elem main-message textC resText" ref={userExplainImgA} style={{ color: 'white' }}>
            <p>
              ??????????????????
              <br />
              ????????????
              <br />
              ????????????.
            </p>
          </div>
          <p>
            <canvas className="image-blend-canvas" width={1980} height={1080} ref={userExplainCanvas}></canvas>
          </p>

          <div className="animation textB" ref={userExplainGifA}>
            <div className="mini-TextB-Section b">
              <img
                className="gifFile"
                src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%E1%84%8E%E1%85%A2%E1%84%90%E1%85%A2%E1%86%A8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5.gif"
                alt=""
              />

              <p>
                <strong>????????????</strong>
                <br />
                ?????? ????????? ??? ???????????? <br />
                ??????????????????
                <br />
              </p>
            </div>
          </div>
          <div className="animation textD" ref={userExplainTextB}>
            <div className="mini-TextD-Section d">
              <img
                className="gifFile"
                src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%E1%84%8E%E1%85%A2%E1%84%90%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5.gif"
                alt=""
              />
              <p>
                <strong>????????????</strong> <br />
                ??????????????? ??? ???????????? ?????????
                <br />
                ????????? ?????? ??????????????? ???????????????!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-4" ref={section4}>
        <div className="start mentor a" ref={mentorExplainA}>
          <p>
            <small ref={fixScreen} style={{ fontSize: '8vh' }}>
              ???????????? ??????
            </small>{' '}
            <br />
            <strong style={{ fontSize: '10vh', fontFamily: 'font-css' }}>?????????????</strong> <br />
          </p>
        </div>
        <div className="explainA mentor a" ref={mentorExplainB}>
          <div className="textSection mentor">
            <div className="textBox">
              <strong>????????? ?????????</strong> <br />
              ???????????? ?????????
              <br />
              ???????????? ???????????????
              <br />
              ?????? ?????? ????????? ???????????????
            </div>
            <img
              className="gifFile mentor"
              src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%E1%84%91%E1%85%B5%E1%84%83%E1%85%B3%E1%84%87%E1%85%A2%E1%86%A8+%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC.gif"
              alt=""
            />
          </div>
        </div>
        <div className="explainA mentor b" ref={mentorExplainC}>
          <div className="textSection mentor">
            <div className="textBox" ref={mentorExplainCTextAction}>
              <strong>?????? ?????????</strong> <br />
              ?????? ????????? ?????? <br />
              ???????????? ??????????????????! <br /> <br />
              *????????? ?????? ??????????????? <br />
              ???????????? ??????????????? <br />
            </div>
            <img
              className="gifFile"
              src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%EB%9E%AD%ED%82%B9%ED%91%9C%EC%8B%9C.gif"
              alt=""
              ref={mentorExplainCImgAction}
            />
          </div>
        </div>
        <div className="explainA mentor c">
          <div className="textSection mentor" ref={mentorExplainD}>
            <img
              className="gifFile"
              src="https://is-this-right-sources.s3.ap-northeast-2.amazonaws.com/gifs/%E1%84%8E%E1%85%A2%E1%84%90%E1%85%B5%E1%86%BC%E1%84%87%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A7%E1%86%BC.gif"
              alt=""
            />
            <div className="textBox">
              <strong>??????</strong> <br />
              ????????? ??????
              <br />
              ???????????? ???????????? ???????????????
              <br />
              ???????????? ???????????????!
            </div>
          </div>
        </div>
      </section>
      <div className="goToTop">
        <ButtonToGoTopStyle onClick={gotoTop}>Main Page</ButtonToGoTopStyle>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
