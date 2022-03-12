import styled from "styled-components";
import Link from "next/link";

const NavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  top: 50%;

  z-index: 1;
  transform: translateY(-50%);
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const LeftNavItem = styled(NavItem)`
  position: absolute;
  left: 0;
`;

const RightNavItem = styled(NavItem)`
  position: absolute;
  right: 0;
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
            <a>{left}</a>
          </Link>
        </LeftNavItem>
      )}
      {right && (
        <RightNavItem>
          <Link href={linkRight}>
            <a>{right}</a>
          </Link>
        </RightNavItem>
      )}
    </NavWrapper>
  );
}
