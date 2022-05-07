import styled from "styled-components";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { SignInButton, LogoutButton } from "components/authComponents";

const HeaderWrapper = styled.header`
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
      {status === "authenticated" && (
        <ProfileInfo>
          <ProfileImage src={data.user.image} />
          <h4>{data.user.name}</h4>
          <LogoutButton
            onClick={() => {
              signOut({
                callbackUrl: "http://localhost:3000/",
              });
            }}
          >
            logout
          </LogoutButton>
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

      <PageTitle>{componentName}</PageTitle>
    </HeaderWrapper>
  );
}
