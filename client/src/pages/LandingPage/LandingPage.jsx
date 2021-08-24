import React, { useRef, useState, useEffect } from 'react';
import './Default.css';
import './Main.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const RotateSpan = styled.span`
  transform: rotate(20deg);
  -moz-transform: rotate(20deg);
  -webkit-transform: rotate(20deg);
  -o-transform: rotate(20deg);
`;

function LandingPage() {
  const ref = useRef();
  const section0 = useRef();
  const section0A = useRef();
  const section0B = useRef();
  const section0C = useRef();
  const section0D = useRef();
  const section0E = useRef();

  const section1 = useRef();
  const section1A = useRef();
  const section1B = useRef();
  const section1C = useRef();
  const section1D = useRef();
  const section1E = useRef();
  const section1F = useRef();
  const section1G = useRef();

  const section2 = useRef();
  const section2A = useRef();
  const section2B = useRef();
  const section2C = useRef();

  const section3 = useRef();
  const section4 = useRef();

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
        messageE: section0E,
      },
      values: {
        //인
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.2 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.2 }],

        messageBOpacityIn: [0, 1, { start: 0.3, end: 0.4 }],
        messageBTranslateYIn: [20, 0, { start: 0.3, end: 0.4 }],

        messageCOpacityIn: [0, 1, { start: 0.5, end: 0.6 }],
        messageCTranslateYIn: [20, 0, { start: 0.5, end: 0.6 }],

        messageDOpacityIn: [0, 1, { start: 0.6, end: 0.7 }],
        messageDTranslateYIn: [20, 0, { start: 0.6, end: 0.7 }],

        messageEOpacityIn: [0, 1, { start: 0.7, end: 0.8 }],
        messageETranslateYIn: [20, 0, { start: 0.7, end: 0.8 }],

        //아웃
        messageAOpacityOut: [1, 0, { start: 0.22, end: 0.3 }],
        messageATranslateYOut: [0, -20, { start: 0.22, end: 0.3 }],

        messageBOpacityOut: [1, 0, { start: 0.42, end: 0.5 }],
        messageBTranslateYOut: [0, -20, { start: 0.42, end: 0.5 }],

        messageCOpacityOut: [1, 0, { start: 0.52, end: 0.6 }],
        messageCTranslateYOut: [0, -20, { start: 0.52, end: 0.6 }],

        messageDOpacityOut: [1, 0, { start: 0.62, end: 0.7 }],
        messageDTranslateYOut: [0, -20, { start: 0.62, end: 0.7 }],

        messageEOpacityOut: [1, 0, { start: 0.82, end: 0.9 }],
        messageETranslateYOut: [0, -20, { start: 0.82, end: 0.9 }],
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
      },
      values: {
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

        messageGOpacityOut: [1, 0, { start: 0.87, end: 0.9 }],
        messageGTranslateYOut: [0, -20, { start: 0.87, end: 0.9 }],
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
      },
      values: {
        //인
        messageAOpacityIn: [0, 1, { start: 0.15, end: 0.25 }],
        messageATranslateYIn: [20, 0, { start: 0.15, end: 0.25 }],

        messageBOpacityIn: [0, 1, { start: 0.42, end: 0.5 }],
        messageBTranslateYIn: [20, 0, { start: 0.42, end: 0.5 }],

        messageCOpacityIn: [0, 1, { start: 0.65, end: 0.7 }],
        messageCTranslateYIn: [20, 0, { start: 0.65, end: 0.7 }],

        //아웃
        messageAOpacityOut: [1, 0, { start: 0.3, end: 0.4 }],
        messageATranslateYOut: [0, -20, { start: 0.3, end: 0.4 }],

        messageBOpacityOut: [1, 0, { start: 0.53, end: 0.6 }],
        messageBTranslateYOut: [0, -20, { start: 0.53, end: 0.6 }],

        messageCOpacityOut: [1, 0, { start: 0.8, end: 0.9 }],
        messageCTranslateYOut: [0, -20, { start: 0.8, end: 0.9 }],
      },
    },
    {
      //3
      scrollHeight: 0,
      heightNum: 5,
      type: 'sticky',
      objs: {
        container: section3,
      },
    },
    {
      //4
      scrollHeight: 0,
      heightNum: 5,
      type: 'sticky',
      objs: {
        container: section4,
      },
    },
  ];

  const setLayout = () => {
    yOffset = window.pageYOffset;

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
    console.log(objs, values);
    console.log(currentYOffset, currentScene, scrollRatio);
    switch (currentScene) {
      case 0:
        if (scrollRatio <= 0.22) {
          objs.messageA.current.style.opacity = calcValues(values.messageAOpacityIn, currentYOffset);
          objs.messageA.current.style.transform = `translateY(${calcValues(
            values.messageATranslateYIn,
            currentYOffset,
          )}%)`;
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
        console.log('2 실행');
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

        if (scrollRatio <= 0.57) {
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

        if (scrollRatio <= 0.85) {
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
        break;
      case 3:
        break;
      case 4:
        break;
    }
  };

  const scrollLoop = () => {
    console.log(currentScene);
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

  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  return (
    <div className="body" ref={ref}>
      <Nav landing="landing" />
      <section className="scroll-section" id="scroll-section-0" ref={section0}>
        <h1>
          이거 맞아<span className="logo-rotate">?</span>
        </h1>
        <h2>Is this right?</h2>
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
        <div className="sticky-elem main-message e" ref={section0E}>
          <p>
            내 공은 왜 <br></br> 직선으로 안가나 <br></br> 생각해본적이 없으신가요?
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-1" ref={section1}>
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
        <div className="sticky-elem main-message a" ref={section2A}>
          <p>너무 많은 고민들...</p>
        </div>
        <div className="sticky-elem main-message b" ref={section2B}>
          <p>여러분들을 위해</p>
        </div>
        <div className="sticky-elem main-message c" ref={section2C}>
          <p>
            <h1>
              이거 맞아<span className="logo-rotate">?</span>
            </h1>
            <br></br>
            <small>에서 도와드립니다.</small>
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-3" ref={section3}>
        <p className="servise-dec">비디오와 설명</p>
      </section>
      <section className="scroll-section" id="scroll-section-4" ref={section4}>
        <p className="servise-dec">비디오와 설명</p>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;