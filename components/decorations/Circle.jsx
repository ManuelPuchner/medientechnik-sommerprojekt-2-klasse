import styled from "styled-components";

export default styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  top: ${(props) => props.y + "%"};
  left: ${(props) => props.x + "%"};
  width: ${(props) => props.size + "em"};
  height: ${(props) => props.size + "em"};
`;
