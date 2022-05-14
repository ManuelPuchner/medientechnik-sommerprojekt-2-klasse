import styled from "styled-components";

const ConfigLink = styled.a`
  box-shadow: 0px 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(0.5rem);
  border-radius: 0.3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 0.3rem;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
    box-shadow: 0px 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
  }

  width: 6rem;

  & > svg {
    display: block;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
  }
`;
export default ConfigLink;