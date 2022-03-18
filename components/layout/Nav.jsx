import styled from "styled-components";
import Link from "next/link";

import {BsFillCaretLeftFill, BsFillCaretRightFill} from "react-icons/bs";

const NavWrapper = styled.div`
`;

const NavItem = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  top: 50%;

  z-index: 1;
  transform: translateY(-50%);

  border-radius: 0.4rem;
  height: 3rem;
  line-height: 3rem;
  vertical-align: middle;


  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & span {
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  & svg {
    display: block;
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    color: #000;
    background-color: rgba(255 255 255 / 0.75);
    backdrop-filter: blur(5px);
    & span {
      opacity: 1;
    }
  }
`;

const LeftNavItem = styled(NavItem)`
  left: 0;
  &:hover svg {
    transform: translateX(-20%);
  }
`;

const RightNavItem = styled(NavItem)`
  right: 0;

  &:hover svg {
    transform: translateX(20%);
  }
`;

const routes = ["About", "Home", "Configurator"];

export default function Nav({ currentPage }) {
  const left = routes[routes.indexOf(currentPage) - 1]?.toLowerCase();
  const right = routes[routes.indexOf(currentPage) + 1]?.toLowerCase();
  const linkLeft = left?.charAt(0) === "/" ? left : `/${left}`;
  const linkRight = right?.charAt(0) === "/" ? right : `/${right}`;
  return (
    <NavWrapper>
      {left && (
        <LeftNavItem>
          <Link href={linkLeft}>
            <a>
              <BsFillCaretLeftFill />
              <span>{left}</span>
            </a>
          </Link>
        </LeftNavItem>
      )}
      {right && (
        <RightNavItem>
          <Link href={linkRight}>
            <a>
              <span>{right}</span>
              <BsFillCaretRightFill />
            </a>
          </Link>
        </RightNavItem>
      )}
    </NavWrapper>
  );
}
