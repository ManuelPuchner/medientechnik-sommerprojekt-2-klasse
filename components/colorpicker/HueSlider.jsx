import styled from "styled-components";
import { useRef } from "react";

const HueSliderWrapper = styled.div`
  position: relative;
  height: 2rem;
  width: 100%;
  margin-top: 0.25rem;

  background-image: linear-gradient(
    to right,
    hsl(0, 100%, 50%) 0%,
    hsl(60, 100%, 50%) 16.67%,
    hsl(120, 100%, 50%) 33.33%,
    hsl(180, 100%, 50%) 50%,
    hsl(240, 100%, 50%) 66.67%,
    hsl(320, 100%, 50%) 83.33%,
    hsl(360, 100%, 50%) 100%
  );
`;

const HuePointer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  height: 100%;
  width: 0.75rem;
  opacity: 0.5;
  background-color: #000;
  cursor: pointer;
`;

function HueSlider({ hue, handleHueChange }) {
  let isDragging = false;

  const pointerRef = useRef();
  const hueSliderRef = useRef();

  const handleMouseMove = (e) => {
    if (isDragging) {
      let rect = hueSliderRef.current.getBoundingClientRect();
      let posX = e.clientX - rect.left;

      if (posX < 0) {
        posX = 0;
      } else if (posX > rect.width) {
        posX = rect.width;
      }

      pointerRef.current.style.left = posX + "px";
    }
  };

  const handleDrag = (e) => {
    if (!isDragging) {
      isDragging = true;
    }
  };

  const handleMouseUp = (e) => {
    isDragging = false;
    let rect = hueSliderRef.current.getBoundingClientRect();
    let posX = e.clientX - rect.left;

    let hue = Math.round(getHue({ x: posX, width: rect.width }));
    handleHueChange(e, hue);
  };

  const getHue = ({ x, width }) => {
    let hue = (x / width) * 360;
    if (hue < 0) {
      hue = 0;
    } else if (hue > 360) {
      hue = 360;
    }
    return hue;
  };

  return (
    <HueSliderWrapper ref={hueSliderRef} onPointerMove={handleMouseMove}>
      <HuePointer
        ref={pointerRef}
        onPointerDown={handleDrag}
        onPointerUp={handleMouseUp}
      />
    </HueSliderWrapper>
  );
}

export default HueSlider;
