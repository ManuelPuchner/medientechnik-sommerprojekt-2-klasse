import { useState, useRef } from "react";
import styled from "styled-components";

const ColorField = styled.div`
  position: relative;
  height: 15rem;
  width: 25rem;
  background-image: linear-gradient(to bottom, transparent 0%, #000 100%),
    linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background-blend-mode: normal;
  background-size: 100% 100%;
  background-position: 0% 0%;
  background-repeat: no-repeat;

  background-color: ${(props) => props.color};
  overflow: show;
`;

const Pointer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export function ColorPicker({ onChange }) {
  const [color, setColor] = useState("#ff0000");
  const [hue, setHue] = useState(0);

  let isDragging = false;

  const pointerRef = useRef();
  const colorFieldRef = useRef();

  const handleDrag = (e) => {
    if (!isDragging) {
      isDragging = true;
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      let rect = colorFieldRef.current.getBoundingClientRect();
      let posX = e.clientX - rect.left;
      let posY = e.clientY - rect.top;

      if (posX < 0) {
        posX = 0;
      } else if (posX > rect.width) {
        posX = rect.width;
      }

      if (posY < 0) {
        posY = 0;
      } else if (posY > rect.height) {
        posY = rect.height;
      }

      pointerRef.current.style.left = `${posX}px`;
      pointerRef.current.style.top = `${posY}px`;
    }
  };

  const map = (val, in_min, in_max, out_min, out_max) =>
    ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  const getColor = ({ x, y, width, height }) => {
    console.log({x: x, y: y, width: width, height: height});
    let s = map(x, 0, width, 0, 100);
    let l = map(y, 0, height, 100, 0);

    let hsl = `hsl(${hue}, ${s}%, ${l}%)`;
    return hsl;
  };

  const handleMouseUp = (e) => {
    isDragging = false;
    let rect = colorFieldRef.current.getBoundingClientRect();
    let hsl = getColor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    });

    setColor(hsl);
    onChange();
  };

  return (
    <>
      <div>
        <ColorField
          ref={colorFieldRef}
          color={`hsl(${hue}, 100%, 50%)`}
          onMouseMove={handleMouseMove}
        >
          <Pointer
            ref={pointerRef}
            color={color}
            onMouseDown={handleDrag}
            onMouseUp={handleMouseUp}
          />
        </ColorField>
      </div>
    </>
  );
}
