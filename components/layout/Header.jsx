import styled from "styled-components";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { SignInButton, LogoutButton } from "components/authComponents";
import Dropdown from "components/dropdown";

const HeaderWrapper = styled.header`
  z-index:1000;
  position: relative;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyName = styled.h1`
  margin: 0;
  padding: 0;
`;

const PageTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

const LoginProfileWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function Header({ componentName }) {
  const { data, status } = useSession();
  return (
    <HeaderWrapper>
      <CompanyName>
        <Link href={"/"}>
          <a>MyShoes</a>
        </Link>
      </CompanyName>

      <LoginProfileWrapper>
        {status === "authenticated" && (
          <ProfileInfo>
            <Dropdown
              headerConfig={{
                content: <ProfileImage src={data.user.image} />,
              }}
            >
              <Dropdown.Item>
                <>{data.user.name}</>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/account">
                  <a>View Account</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/cart">
                  <a>View Cart</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <LogoutButton
                  onClick={() => {
                    signOut({
                      callbackUrl: "http://localhost:3000/",
                    });
                  }}
                >
                  LogOut
                </LogoutButton>
              </Dropdown.Item>
            </Dropdown>
          </ProfileInfo>
        )}

        {status === "unauthenticated" && (
          <SignInButton
            onClick={() => {
              signIn("github", {
                callbackUrl: "http://localhost:3000/account/",
              });
            }}
          >
            SignUp
          </SignInButton>
        )}
      </LoginProfileWrapper>

      <PageTitle>{componentName}</PageTitle>
    </HeaderWrapper>
  );
}
