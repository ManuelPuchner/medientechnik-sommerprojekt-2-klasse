import { useState, useRef } from "react";
import styled from "styled-components";
import { HEXtoHSV, HSVtoHEX } from "utils/colorConversions";
import { map } from "utils";

import HueSlider from "./HueSlider";

const ColorField = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const ColorPickerWrapper = styled.div`
  height: 15rem;
  width: 25rem;
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

  const getColor = ({ x, y, width, height }) => {
    if (x > width) {
      x = width;
    } else if (x < 0) {
      x = 0;
    }

    if (y > height) {
      y = height;
    } else if (y < 0) {
      y = 0;
    }

    let s = map(x, 0, width, 0, 1);
    let v = map(y, 0, height, 1, 0);
    return [s, v];
  };

  const handleMouseUp = (e) => {
    isDragging = false;
    let rect = colorFieldRef.current.getBoundingClientRect();
    let [s, v] = getColor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    });

    let hex = HSVtoHEX(hue, s, v);
    setColor(hex);
    onChange(hex);
    // console.log("color change", {hue, s, v},{r, g, b}, hex)
  };

  const handleHueChange = (e, _hue) => {
    setHue(_hue);
    let newHSV = HEXtoHSV(color);
    let newColor = HSVtoHEX(_hue, newHSV.s / 100, newHSV.v / 100);
    onChange(newColor);
    setColor(newColor);
  };

  return (
    <ColorPickerWrapper className="color-picker">
      <ColorField
        ref={colorFieldRef}
        color={`hsl(${hue}, 100%, 50%)`}
        onPointerMove={handleMouseMove}
      >
        <Pointer
          ref={pointerRef}
          color={"#00ff00"}
          onPointerDown={handleDrag}
          onPointerUp={handleMouseUp}
        />
      </ColorField>
      <HueSlider hue={hue} handleHueChange={handleHueChange} />
    </ColorPickerWrapper>
  );
}
