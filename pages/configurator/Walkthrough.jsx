import styled from "styled-components";
import { useState, useRef } from "react";
import { ColorPicker } from "components/colorpicker";

const WalkthroughScreen = styled.div`
  position: absolute;
  height: 100%;
  z-index: 1;
  left: 00vw;
  transition: left 0.75s;
  background-color: rgb(0 0 0 / 0.6);
  overflow-x: auto;
  display: flex;
`;

const WalkthroughStartButton = styled.button`
  height: 3em;
  width: clamp(4em, 80%, 20rem);
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5em;

  & > span {
    margin-left: 0;
    transition: 350ms;
  }

  &:hover {
    & > span {
      margin-left: 0.5em;
    }
  }

  &:active {
    & > span {
      margin-left: 4em;
    }
  }
`;

const WalkthroughHeader = styled.h2`
  font-size: 3rem;
  margin-bottom: 0rem;
  color: white;
`;

// Pages
const WalkthroughStartContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const WalkthoughStep = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;

  & > .color-picker {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  /* & > * {
    z-index: 2;
  } */
`;

const ControlButtonsWrapper = styled.div`
  position: absolute;
  z-index: 1;
`;

const ControlButton = styled.button``;
const PrevButton = styled(ControlButton)``;
const NextButton = styled(ControlButton)``;

const PageIndicatorWrapper = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 1rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PageIndicator = styled.div`
  height: 0.6rem;
  width: 0.6rem;
  margin: 0.2rem;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "green" : "black")};
`;

function Walkthrough({ colors, setColors }) {
  // page state
  // 0: starting page
  // >0: every configuration step
  const [page, setPage] = useState(0);
  const scrollRef = useRef();
  const MAX_PAGE = 8;
  const MIN_PAGE = 0;

  const scrollToNext = () => {
    if (page >= MAX_PAGE) return;
    scrollToPage(page + 1);
    setPage(page + 1);
  };

  const scrollToPrevious = () => {
    if (page <= MIN_PAGE) return;
    scrollToPage(page - 1);
    setPage(page - 1);
  };

  const scrollToPage = (_page = page) => {
    scrollRef.current.style.left = `${-_page}00vw`;
  };

  const handleStart = (e) => {
    e.preventDefault();
    scrollToNext();
    scrollRef.current.style.zIndex = 0;
  };

  return (
    <>
      <WalkthroughScreen ref={scrollRef}>
        <WalkthoughStep>
          <WalkthroughStartContainer>
            <WalkthroughHeader>Start The Configurator</WalkthroughHeader>
            <WalkthroughStartButton onClick={handleStart}>
              Start <span>&gt;</span>
            </WalkthroughStartButton>
          </WalkthroughStartContainer>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Laces</h2>
          <ColorPicker
            onChange={(color) => {
              setColors({ ...colors, laces: color });
            }}
          />
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Mesh</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Caps</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Inner</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Sole</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Stripes</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Band</h2>
        </WalkthoughStep>

        <WalkthoughStep>
          <h2>Patch</h2>
        </WalkthoughStep>
      </WalkthroughScreen>

      {/* <ControlButtonsWrapper>
        <button onClick={() => console.log(page)}>Page</button>
      </ControlButtonsWrapper> */}

      <PageIndicatorWrapper>
        <PrevButton onClick={scrollToPrevious}>Prev</PrevButton>
        {[...Array(MAX_PAGE + 1)].map((_, i) => (
          <PageIndicator
            key={i}
            onClick={() => (scrollToPage(i), setPage(i))}
            active={i === page}
          />
        ))}
        <NextButton onClick={scrollToNext}>Next</NextButton>
      </PageIndicatorWrapper>
    </>
  );
}

export default Walkthrough;