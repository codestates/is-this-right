import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Default.css';
import './Main.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import { Button } from 'antd';
import LoadingCircle from '../../components/LoadingCircle';
import { BackTop } from 'antd';

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
  const section0 = useRef();
  const section0A = useRef();
  const section0B = useRef();
  const section0C = useRef();
  const section0D = useRef();
  const videoCanvas0 = useRef();

  const section1 = useRef();
  const section1A = useRef();
  const section1B = useRef();
  const section1C = useRef();
  const section1D = useRef();
  const section1E = useRef();
  const section1F = useRef();
  const section1G = useRef();
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

  const goToAdviserListPage = () => {
    history.push('/');
  };

  let yOffset = 0;
  //window.pageYOffset 대신 사용할 변수 => 현재 스크롤 위치를 알 수 있음
  // const [yOffset, setYOffset] = useState(0);
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 씬(scroll-section)
  let enterNewScene = false; //새로운 씬일때 true
  const sceneInfo = [
    {
      //0
      //스크롤 높이 => 영상과 문자 애니메이션 속도를 조절함
      //0으로 둔 이유는 브라우저를 여는 기계에 따라 높이가 다르기에
      // 그 기계 height의 배수로 처리한다.
      scrollHeight: 0,
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 설정
      type: 'sticky', //해당 구ㄱ관의 그냥 스크롤인지 스티키인지 설정
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
        //인
        videoImageCount: 315,
        imageSequence: [0, 314],
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.2 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.2 }],

        messageBOpacityIn: [0, 1, { start: 0.3, end: 0.4 }],
        messageBTranslateYIn: [20, 0, { start: 0.3, end: 0.4 }],

        messageCOpacityIn: [0, 1, { start: 0.5, end: 0.6 }],
        messageCTranslateYIn: [20, 0, { start: 0.5, end: 0.6 }],

        messageDOpacityIn: [0, 1, { start: 0.6, end: 0.7 }],
        messageDTranslateYIn: [20, 0, { start: 0.6, end: 0.7 }],

        //아웃
        messageAOpacityOut: [1, 0, { start: 0.22, end: 0.3 }],
        messageATranslateYOut: [0, -20, { start: 0.22, end: 0.3 }],

        messageBOpacityOut: [1, 0, { start: 0.42, end: 0.5 }],
        messageBTranslateYOut: [0, -20, { start: 0.42, end: 0.5 }],

        messageCOpacityOut: [1, 0, { start: 0.52, end: 0.6 }],
        messageCTranslateYOut: [0, -20, { start: 0.52, end: 0.6 }],

        messageDOpacityOut: [1, 0, { start: 0.62, end: 0.7 }],
        messageDTranslateYOut: [0, -20, { start: 0.62, end: 0.7 }],
      },
    },
    {
      //1
      scrollHeight: 0,
      heightNum: 5,
      type: 'sticky',
      objs: {
        container: section1,
        messageA: section1A,
        messageB: section1B,
        messageC: section1C,
        messageD: section1D,
        messageE: section1E,
        messageF: section1F,
        messageG: section1G,
        canvas: videoCanvas1,
        conText: videoCanvas1,
        videoImages: [],
      },
      values: {
        videoImageCount: 315,
        imageSequence: [0, 314],
        //인
        messageAOpacityIn: [0, 1, { start: 0.08, end: 0.14 }],
        messageATranslateYIn: [20, 0, { start: 0.08, end: 0.14 }],

        messageBOpacityIn: [0, 1, { start: 0.21, end: 0.26 }],
        messageBTranslateYIn: [20, 0, { start: 0.21, end: 0.26 }],

        messageCOpacityIn: [0, 1, { start: 0.33, end: 0.38 }],
        messageCTranslateYIn: [20, 0, { start: 0.33, end: 0.38 }],

        messageDOpacityIn: [0, 1, { start: 0.45, end: 0.5 }],
        messageDTranslateYIn: [20, 0, { start: 0.45, end: 0.5 }],

        messageEOpacityIn: [0, 1, { start: 0.57, end: 0.62 }],
        messageETranslateYIn: [20, 0, { start: 0.57, end: 0.62 }],

        messageFOpacityIn: [0, 1, { start: 0.69, end: 0.74 }],
        messageFTranslateYIn: [20, 0, { start: 0.69, end: 0.74 }],

        messageGOpacityIn: [0, 1, { start: 0.81, end: 0.86 }],
        messageGTranslateYIn: [20, 0, { start: 0.81, end: 0.86 }],

        //아웃
        messageAOpacityOut: [1, 0, { start: 0.15, end: 0.2 }],
        messageATranslateYOut: [0, -20, { start: 0.15, end: 0.2 }],

        messageBOpacityOut: [1, 0, { start: 0.27, end: 0.32 }],
        messageBTranslateYOut: [0, -20, { start: 0.27, end: 0.32 }],

        messageCOpacityOut: [1, 0, { start: 0.39, end: 0.44 }],
        messageCTranslateYOut: [0, -20, { start: 0.39, end: 0.44 }],

        messageDOpacityOut: [1, 0, { start: 0.51, end: 0.56 }],
        messageDTranslateYOut: [0, -20, { start: 0.51, end: 0.56 }],

        messageEOpacityOut: [1, 0, { start: 0.63, end: 0.68 }],
        messageETranslateYOut: [0, -20, { start: 0.63, end: 0.68 }],

        messageFOpacityOut: [1, 0, { start: 0.75, end: 0.8 }],
        messageFTranslateYOut: [0, -20, { start: 0.75, end: 0.8 }],

        messageGOpacityOut: [1, 0, { start: 0.87, end: 0.95 }],
        messageGTranslateYOut: [0, -20, { start: 0.87, end: 0.95 }],
      },
    },
    {
      //2
      scrollHeight: 0,
      heightNum: 5,
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
        //인
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.15 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.15 }],

        messageBOpacityIn: [0, 1, { start: 0.27, end: 0.29 }],
        messageBTranslateYIn: [20, 0, { start: 0.27, end: 0.29 }],

        messageCOpacityIn: [0, 1, { start: 0.42, end: 0.45 }],
        // messageCTranslateYIn: [20, 0, { start: 0.42, end: 0.45 }],

        //아웃
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
        //인
        // messageAOpacityIn: [20, 0, { start: 0.1, end: 0.15 }],
        backgroundTranslateXLeftIn: [-100, 0, { start: 0.05, end: 0.07 }],
        backgroundOpacityLeftIn: [0, 1, { start: 0.05, end: 0.07 }],

        backgroundTranslateXIn: [0, 1, { start: 0.25, end: 0.35 }],
        backgroundOpacityIn: [0, 1, { start: 0.25, end: 0.35 }],

        backgroundOpacityRightIn: [0, 1, { start: 0.48, end: 0.55 }],
        backgroundTranslateXRightIn: [100, 0, { start: 0.48, end: 0.55 }],

        backgroundOpacityCenterIn: [0, 1, { start: 0.76, end: 0.8 }],

        //아웃
        // messageAOpacityOut: [0, -20, { start: 0.2, end: 0.25 }],
        backgroundTranslateXLeftOut: [0, -100, { start: 0.2, end: 0.25 }],
        backgroundOpacityLeftOut: [1, 0, { start: 0.2, end: 0.25 }],

        backgroundTranslateXOut: [1, 0, { start: 0.42, end: 0.45 }],
        backgroundOpacityOut: [1, 0, { start: 0.42, end: 0.45 }],

        backgroundOpacityRightOut: [1, 0, { start: 0.74, end: 0.8 }],
        backgroundTranslateXRightOut: [0, 100, { start: 0.74, end: 0.8 }],

        backgroundOpacityCenterOut: [1, 0, { start: 0.9, end: 0.98 }],
      },
    },
    {
      //4
      scrollHeight: 0,
      heightNum: 5,
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
        //인
        mentorTextOpacityIn: [0, 1, { start: 0, end: 0.05 }],
        mentorTextTranslateYIn: [20, 0, { start: 0, end: 0.05 }],

        mentorFeedbackExplainOpacityIn: [0, 1, { start: 0.07, end: 0.1 }],
        mentorFeedbackExplainTranslateIn: [20, 0, { start: 0.07, end: 0.1 }],

        mentorExplainCTextActionOpacityIn: [0, 1, { start: 0.35, end: 0.4 }],
        mentorExplainCImgActionTranslateLeftIn: [-100, 0, { start: 0.35, end: 0.4 }],
        mentorExplainCImgActionTranslateRightIn: [100, 0, { start: 0.35, end: 0.4 }],

        //아웃
        mentorTextOpacityOut: [1, 0, { start: 0.1, end: 0.15 }],
        mentorTextTranslateYOut: [0, -20, { start: 0.12, end: 0.17 }],

        mentorFeedbackExplainOpacityOut: [1, 0, { start: 0.32, end: 0.37 }],
        mentorFeedbackExplainTranslateOut: [0, -20, { start: 0.32, end: 0.37 }],

        mentorExplainCTextActionOpacityOut: [1, 0, { start: 0.65, end: 0.7 }],
        mentorExplainCImgActionTranslateLeftOut: [0, -100, { start: 0.65, end: 0.7 }],
        mentorExplainCImgActionTranslateRightOut: [0, 100, { start: 0.65, end: 0.7 }],
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

  const setLayout = () => {
    yOffset = window.pageYOffset;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    for (let i = 0; i < sceneInfo.length; i++) {
      //각 스크롤 섹션의 높이 셋팅
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.current.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    ref.current.setAttribute('id', `show-scene-${currentScene}`);

    sceneInfo[0].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
    sceneInfo[1].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
    sceneInfo[2].objs.canvas.current.style.transform = `translate3d(-50%, -50%, 0) `;
  };

  const calcValues = (values, currentYOffset) => {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      //스타트 엔드 사이에 애니메이션 실행
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

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    console.log(scrollRatio);
    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.conText.current
          .getContext('2d')
          .drawImage(objs.videoImages[sequence], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
        if (scrollRatio <= 0.22) {
          if (objs.messageA.current.style) {
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
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYIn,
            currentYOffset,
          )}%, 0)`;
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
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.current.style.opacity = calcValues(values.messageDOpacityIn, currentYOffset);
          objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
            values.messageDTranslateYIn,
            currentYOffset,
          )}%, 0)`;
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
        objs.conText.current
          .getContext('2d')
          .drawImage(objs.videoImages[sequence1], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
        if (scrollRatio <= 0.12) {
          // in
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.24) {
          // in
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.36) {
          // in
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityOut, currentYOffset);
          objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
            values.messageCTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.48) {
          // in
          objs.messageD.current.style.opacity = calcValues(values.messageDOpacityIn, currentYOffset);
          objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
            values.messageDTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageD.current.style.opacity = calcValues(values.messageDOpacityOut, currentYOffset);
          objs.messageD.current.style.transform = `translate3d(0, ${calcValues(
            values.messageDTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.6) {
          // in
          objs.messageE.current.style.opacity = calcValues(values.messageEOpacityIn, currentYOffset);
          objs.messageE.current.style.transform = `translate3d(0, ${calcValues(
            values.messageETranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageE.current.style.opacity = calcValues(values.messageEOpacityOut, currentYOffset);
          objs.messageE.current.style.transform = `translate3d(0, ${calcValues(
            values.messageETranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.72) {
          // in
          objs.messageF.current.style.opacity = calcValues(values.messageFOpacityIn, currentYOffset);
          objs.messageF.current.style.transform = `translate3d(0, ${calcValues(
            values.messageFTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageF.current.style.opacity = calcValues(values.messageFOpacityOut, currentYOffset);
          objs.messageF.current.style.transform = `translate3d(0, ${calcValues(
            values.messageFTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.84) {
          // in
          objs.messageG.current.style.opacity = calcValues(values.messageGOpacityIn, currentYOffset);
          objs.messageG.current.style.transform = `translate3d(0, ${calcValues(
            values.messageGTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageG.current.style.opacity = calcValues(values.messageGOpacityOut, currentYOffset);
          objs.messageG.current.style.transform = `translate3d(0, ${calcValues(
            values.messageGTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }
        break;

      case 2:
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.conText.current
          .getContext('2d')
          .drawImage(objs.videoImages[sequence2], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
        objs.conText.current.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityOut, currentYOffset);
          objs.messageA.current.style.transform = `translate3d(0, ${calcValues(
            values.messageATranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.37) {
          // in
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityIn, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageB.current.style.opacity = calcValues(values.messageBOpacityOut, currentYOffset);
          objs.messageB.current.style.transform = `translate3d(0, ${calcValues(
            values.messageBTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.95) {
          // in
          objs.messageC.current.style.opacity = calcValues(values.messageCOpacityIn, currentYOffset);
          // objs.messageC.current.style.transform = `translate3d(0, ${calcValues(
          //   values.messageCTranslateYIn,
          //   currentYOffset,
          // )}%, 0)`;
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
        //가로사로 모두 꽉 차게하기 위해 여서 세팅
        const widthRatio = window.innerWidth / objs.canvas.current.width;
        const heightRatio = window.innerHeight / objs.canvas.current.height;
        let canvasScaleRatio = 0;
        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }
        objs.canvas.current.transform = `scale(${canvasScaleRatio})`;
        objs.canvas.current
          .getContext('2d')
          .drawImage(objs.imagePath[0], 0, 0, objs.canvas.current.width, objs.canvas.current.height);

        if (scrollRatio <= 0.2) {
          objs.userExplainTextA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXLeftIn,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainTextA.current.style.opacity = calcValues(values.backgroundOpacityLeftIn, currentYOffset);
        } else {
          objs.userExplainTextA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXLeftOut,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainTextA.current.style.opacity = calcValues(values.backgroundOpacityLeftOut, currentYOffset);
        }

        if (scrollRatio <= 0.35) {
          objs.userExplainImgA.current.style.color = 'black';
        } else {
          objs.userExplainImgA.current.style.color = 'white';
        }

        if (scrollRatio <= 0.25) {
          objs.userExplainImgA.current.style.opacity = calcValues(values.backgroundOpacityIn, currentYOffset);
          objs.userExplainImgA.current.style.transform = `translate3d(0, ${calcValues(
            values.backgroundTranslateXIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          objs.userExplainImgA.current.style.opacity = calcValues(values.backgroundOpacityOut, currentYOffset);
          objs.userExplainImgA.current.style.transform = `translate3d(0, ${calcValues(
            values.backgroundTranslateXOut,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.66) {
          objs.userExplainGifA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXRightIn,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainGifA.current.style.opacity = calcValues(values.backgroundOpacityRightIn, currentYOffset);
        } else {
          objs.userExplainGifA.current.style.transform = `translate3d(${calcValues(
            values.backgroundTranslateXRightOut,
            currentYOffset,
          )}%,0, 0)`;
          objs.userExplainGifA.current.style.opacity = calcValues(values.backgroundOpacityRightOut, currentYOffset);
        }

        if (scrollRatio <= 0.76) {
          objs.userExplainTextB.current.style.opacity = calcValues(values.backgroundOpacityCenterIn, currentYOffset);
        } else {
          objs.userExplainTextB.current.style.opacity = calcValues(values.backgroundOpacityCenterOut, currentYOffset);
        }
        console.log(calcValues(sceneInfo[4].values.mentorTextOpacityOut, currentYOffset));

        break;
      case 4:
        if (scrollRatio <= 0.2) {
          //           sceneInfo[4].objs;
          // sceneInfo[4].values;
          objs.mentorExplainA.current.style.opacity = calcValues(values.mentorTextOpacityIn, currentYOffset);
          objs.mentorExplainA.current.style.transform = `translate3d(0, ${calcValues(
            values.mentorTextTranslateYIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          objs.mentorExplainA.current.style.opacity = calcValues(values.mentorTextOpacityOut, currentYOffset);
          objs.mentorExplainA.current.style.transform = `translate3d(0, ${calcValues(
            values.mentorTextTranslateYOut,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio <= 0.35) {
          objs.mentorExplainB.current.style.opacity = calcValues(values.mentorFeedbackExplainOpacityIn, currentYOffset);
          objs.mentorExplainB.current.style.transform = `translate3d(0, ${calcValues(
            values.mentorFeedbackExplainTranslateIn,
            currentYOffset,
          )}%, 0)`;
        } else {
          objs.mentorExplainB.current.style.opacity = calcValues(
            values.mentorFeedbackExplainOpacityOut,
            currentYOffset,
          );
          objs.mentorExplainB.current.style.transform = `translate3d(0, ${calcValues(
            values.mentorFeedbackExplainTranslateOut,
            currentYOffset,
          )}%, 0)`;
        }
        if (scrollRatio <= 0.65) {
          console.log('실행');
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
        break;
    }
  };

  const scrollLoop = () => {
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
      ref.current.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  };

  let setScrollHeight = () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  };
  window.addEventListener('resize', setLayout);
  useEffect(() => {
    window.addEventListener('load', () => {
      setIsLoading(false);
      setLayout();
      sceneInfo[0].objs.conText.current
        .getContext('2d')
        .drawImage(sceneInfo[0].objs.videoImages[0], 0, 0, videoCanvas0.current.width, videoCanvas0.current.height);
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', setScrollHeight);

    return () => {
      console.log('안나오는거같음');
      window.removeEventListener('load', setLayout);
      window.removeEventListener('resize', setLayout);
      window.removeEventListener('scroll', setScrollHeight);
    };
  }, []);

  const goUserExplainSection = () => {
    const location = userExplainTextA.current.offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };

  const goMentorExplainSection = () => {
    const location = mentorExplainB.current.offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };

  const gotoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="body" ref={ref}>
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
          이거맞아<span className="logo-rotate">?</span>
        </h1>
        <h2>Is this right?</h2>
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
            운동을 시작했을 때, <br></br> 인터넷에 영상은 많은데 <br></br>어떤것이 좋은 것인지 몰라<br></br> 검색만
            주구장창 하신적 없으신가요?
          </p>
        </div>
        <div className="sticky-elem main-message b" ref={section0B}>
          <p>
            유튜브, 온라인 PT를 하면서<br></br> 화면 너머 그 분들에게 <br></br> 자신의 현 상황을 확인받고 싶은적{' '}
            <br></br>
            없으신가요 ?
          </p>
        </div>
        <div className="sticky-elem main-message c" ref={section0C}>
          <p>
            내 자세가 맞는지 <br></br>궁금했던적이 없으신가요?
          </p>
        </div>
        <div className="sticky-elem main-message d" ref={section0D}>
          <p>
            내가 지금 하고있는 운동(루틴)에서<br></br> 발전시킬 수 있는 부분, <br></br>고칠 부분이 뭐가 있을까 <br></br>
            생각해본적이 없으신가요?
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-1" ref={section1}>
        <div className="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-1" width={canvasWidth} height={canvasHeight} ref={videoCanvas1}></canvas>
        </div>
        <div className="sticky-elem main-message a" ref={section1A}>
          <p>그럼 혹시...</p>
        </div>
        <div className="sticky-elem main-message b" ref={section1B}>
          <p>운동 관련 종사자신가요?</p>
        </div>
        <div className="sticky-elem main-message c" ref={section1C}>
          <p>운동 유튜브를 하고있는데</p>
        </div>
        <div className="sticky-elem main-message d" ref={section1D}>
          <p>
            구독자 수가 <br></br>늘지 않아 고민이신가요?
          </p>
        </div>
        <div className="sticky-elem main-message e" ref={section1E}>
          <p>
            자신을 <br></br>홍보를 하고 싶으신가요?
          </p>
        </div>
        <div className="sticky-elem main-message f" ref={section1F}>
          <p>아니면 !</p>
        </div>
        <div className="sticky-elem main-message g" ref={section1G}>
          <p>
            운동갔는데 <br></br> 그 옆 사람을 보며 <br></br>입이 근질근질하지 않으셨나요?
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-2" ref={section2}>
        <div className="sticky-elem sticky-elem-canvas">
          <canvas id="video-canvas-2" width={canvasWidth} height={canvasHeight} ref={videoCanvas2}></canvas>
        </div>
        <div className="sticky-elem main-message a3" ref={section2A}>
          <p>너무 많은 고민들...</p>
        </div>
        <div className="sticky-elem main-message b3" ref={section2B}>
          <p>
            이러한 <strong>여러분</strong>을
          </p>
          <p>도와드립니다.</p>
        </div>
        <div className="sticky-elem main-message c3" ref={section2C}>
          <p>
            <h1>
              이거맞아<span className="logo-rotate">?</span>
            </h1>
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-3" ref={section3}>
        <div className="explain-messageA">
          <div className="animation textA" ref={userExplainTextA}>
            <div className="mini-TextA-Section a">
              <p>
                <strong>질문기능</strong> <br />
                운동에 대한 <br />
                여러분의 모든 궁금증을 <br />
                물어보세요 <br />
              </p>
              <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" />
            </div>
          </div>
          <div className="sticky-elem main-message textC" ref={userExplainImgA} style={{ color: 'white' }}>
            <p>
              여러분들에겐
              <br />
              멘토들이<br></br>있습니다.
            </p>
          </div>
          <p>
            <canvas className="image-blend-canvas" width={1980} height={1080} ref={userExplainCanvas}></canvas>
          </p>

          <div className="animation textB" ref={userExplainGifA}>
            <div className="mini-TextB-Section b">
              <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" />

              <p>
                <strong>채택 기능</strong>
                <br></br>
                가장 마음에 든 <br></br>답변을 선택해주세요<br></br>
              </p>
            </div>
          </div>
          <div className="animation textD" ref={userExplainTextB}>
            <div className="mini-TextD-Section d">
              <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" />
              <p>
                <strong>채팅</strong> <br></br>
                채택 or 검색을 통해 <br></br>
                멘토들과 채팅을 할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-4" ref={section4}>
        <div className="start mentor a" ref={mentorExplainA}>
          <p>
            <small>내가 만약</small> <br></br>
            <strong>멘토</strong>
          </p>
        </div>
        <div className="explainA mentor a" ref={mentorExplainB}>
          <div>
            <strong>Feedback</strong> <br></br>
            질문에 피드백을 <br></br>남겨주세요 <br></br>
            <br></br>
            채택 수는 랭킹에<br></br> 반영됩니다.
          </div>
          <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" />
        </div>
        <div className="explainB mentor b" ref={mentorExplainC}>
          <div ref={mentorExplainCTextAction}>
            <strong>랭 킹</strong> <br></br>
            좋은 답변을 통해 <br></br>
            순위를 높여 <br></br>
            여러분의 계정을 <br></br>
            상단에 <br></br>
            노출시키세요.
          </div>
          <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" ref={mentorExplainCImgAction} />
        </div>
        <div className="explainC mentor c" ref={mentorExplainD}>
          <img className="gifFile" src="../../../imageFile/mockGif.gif" alt="" />

          <div>
            <strong>채팅</strong> <br></br>
            채팅을 통해<br></br>
            보다 많은 유저들과 <br></br>
            소통하고 <br></br>
            여러분을 홍보하세요!
          </div>
        </div>
      </section>
      <div className="goToTop">
        <Button onClick={gotoTop}>상단으로</Button>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
