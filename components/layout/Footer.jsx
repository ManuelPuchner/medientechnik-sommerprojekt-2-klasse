import styled from "styled-components";
import Link from "next/link";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsLinkedIn,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { IoMdMail } from "react-icons/io";

const FooterWrapper = styled.footer`
  display: flex;
  background: rgba(255, 255, 255, 0.31);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.46);

  margin: 1rem;
  padding: 2rem;
`;
const FooterSection = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
`;
const SocialMediaIconsWrapper = styled.div``;
const SocialMediaIcon = styled.a`
  background: rgba(255, 255, 255, 0.31);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.46);

  padding: 1rem;
  margin: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  & > svg {
    font-size: 1.5rem;
    box-sizing: border-box;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
`;

const InformationWrapper = styled.div`
  padding: 1rem;
  margin: 0.25rem;
  & > svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  & > span {
    font-size: 1.1rem;
    line-height: 1.5rem;
    vertical-align: middle;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterSection>
        <InformationWrapper>
          <GrLocation /> <span>Linz, Österreich</span>
        </InformationWrapper>
        <InformationWrapper>
          <BsFillTelephoneFill /> <span>+43 664 888 888</span>
        </InformationWrapper>
        <InformationWrapper>
          <IoMdMail />{" "}
          <span>
            <a href="mailto:mycoolmail@gmail.com">mycoolmail@gmail.com</a>
          </span>
        </InformationWrapper>
      </FooterSection>
      <FooterSection>
        <h3>About the Company</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
          eveniet sint aliquam delectus incidunt soluta, adipisci rerum dolor
          optio commodi impedit ullam, perspiciatis tempora laborum quis minima
          eum labore alias?
        </p>
        <SocialMediaIconsWrapper>
          <Link passHref href="">
            <SocialMediaIcon>
              <BsInstagram />
            </SocialMediaIcon>
          </Link>
          <Link passHref href="">
            <SocialMediaIcon>
              <BsFacebook />
            </SocialMediaIcon>
          </Link>
          <Link passHref href="">
            <SocialMediaIcon>
              <BsTwitter />
            </SocialMediaIcon>
          </Link>
        </SocialMediaIconsWrapper>
      </FooterSection>
    </FooterWrapper>
  );
}
