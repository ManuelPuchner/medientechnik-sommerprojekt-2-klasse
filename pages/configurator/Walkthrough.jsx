import styled from "styled-components";
import { useState, useRef } from "react";

const WalkthroughScreen = styled.div`
  position: absolute;
  height: 100%;
  z-index: 1;
  left: 0;
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
  z-index: 2;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const WalkthoughStep = styled.div`
  width: 100vw;
`;


function Walkthrough() {
  // page state
  // 0: starting page
  // >0: every configuration step
  const [page, setPage] = useState(0);
  const scrollRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    scrollRef.current.style.left = "-100vw"
  };

  return (
    <>
      <WalkthroughStartContainer>
        <WalkthroughHeader>Start The Configurator</WalkthroughHeader>
        <WalkthroughStartButton onClick={handleStart}>
          Start <span>&gt;</span>
        </WalkthroughStartButton>
      </WalkthroughStartContainer>
      <WalkthroughScreen ref={scrollRef}>
        <WalkthoughStep>
          <h2>Laces</h2>
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
    </>
  );
}

export default Walkthrough;
