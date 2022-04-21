import { useState, useRef } from "react";
import styled from "styled-components";

const ColorField = styled.div`
  height: 15rem;
  width: 15rem;
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(to bottom, transparent 0%, #000 100%);

  background-size: 100% 100%;
  background-position: 0% 0%;
  background-repeat: no-repeat;

  background-color: ${(props) => props.color};
`;

const Pointer = styled.div`
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export function ColorPicker({ onChange }) {
  const [color, setColor] = useState("#ff0000");
  const pointerRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    

    console.log(data);

    console.log("drop")
  };
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("drag")
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <div>
        <ColorField color={color} onDrop={handleDrop} onDragOver={handleDragOver}>
          <Pointer
            ref={pointerRef}
            color={color}
            draggable
            onDrag={handleDrag}
          />
        </ColorField>
      </div>
    </>
  );
}
