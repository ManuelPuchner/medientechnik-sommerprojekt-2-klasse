import { useEffect, useRef } from "react";
import styled from "styled-components";

const ActualRect = styled.div`
  background-color: ${(props) => props.color};
  background-color: ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.y + "%"};
  left: ${(props) => props.x + "%"};
  width: ${(props) => props.size + "em"};
  height: ${(props) => props.size + "em"};
`;

function Rect(props) {
  const ref = useRef(0);
  useEffect(() => {
    const shouldRotate = Math.random() > 0.5;
    const randomSpeed = shouldRotate
      ? (Math.random() - 0.5) * 2 * 150 + 130
      : 0;
    window.addEventListener("scroll", () => {
      ref.current.style.transform = `translate(-50%, -50%) rotate(${
        props.rotation + window.scrollY / randomSpeed
      }deg)`;
    });
    () => {
      window.removeEventListener("scroll", () => {
        ref.current.style.transform = `translate(-50%, -50%) rotate(${
          props.rotation + window.scrollY / randomSpeed
        }deg)`;
        console.log(ref);
      });
    };
  }, [props.rotation]);
  return (
    <ActualRect
      ref={ref}
      style={{
        transform: `translate(-50%, -50%) rotate(${props.rotation}deg)`,
      }}
      {...props}
    />
  );
}

export default Rect;
