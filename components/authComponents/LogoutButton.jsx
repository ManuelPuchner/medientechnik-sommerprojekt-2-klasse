import SignInOutButton from "./ButtonTemplate";
import styled from "styled-components";

const LogoutButton = styled(SignInOutButton)`
  &:hover {
    color: #f00;
  }
`;

export default LogoutButton;