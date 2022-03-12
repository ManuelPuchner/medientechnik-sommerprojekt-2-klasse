import styled from "styled-components";
import { useRef, useEffect } from "react";
const ActualTriangle = styled.div`
  position: absolute;
  border-bottom: ${(props) => props.size * 2 * 0.866 + 1 + "em" || "none"} solid
    ${(props) => props.color || "none"};
  border-left: ${(props) => props.size + 1 + "em" || "none"} solid transparent;
  border-right: ${(props) => props.size + 1 + "em" || "none"} solid transparent;
  top: ${(props) => props.y + "%"};
  left: ${(props) => props.x + "%"};
`;

function Triangle(props) {
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
    <ActualTriangle
      ref={ref}
      style={{
        transform: `translate(-50%, -50%) rotate(${props.rotation}deg)`,
      }}
      {...props}
    />
  );
}

export default Triangle;
