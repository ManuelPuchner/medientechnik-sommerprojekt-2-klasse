import styled, {keyframes} from "styled-components";
import ConfigLink from "../account_additions/ConfigLink";

const bgAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 50%;
  }
`;

const CheckoutButton = styled(ConfigLink)`
  padding: 1.5em 2em;
  width: clamp(10rem, 20%, 30rem);
  position: absolute;
  background-position: 100% 50%;
  background: rgb(255, 160, 249);
  background: linear-gradient(
    155deg,
    rgba(255, 160, 249, 1) 0%,
    rgba(255, 242, 52, 1) 20%,
    rgba(174, 255, 97, 1) 40%,
    rgba(126, 255, 247, 1) 60%,
    rgba(188, 155, 255, 1) 80%,
    rgba(255, 184, 104, 1) 100%
  );

  animation: ${bgAnimation} 15s ease infinite;
`;

export default CheckoutButton;