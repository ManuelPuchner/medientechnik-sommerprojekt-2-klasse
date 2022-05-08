import styled from "styled-components";
import Image from "next/image";

const MainSection = styled.section`
  width: 90%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
`;

const MainImageWrapper = styled.div`
  width: 50%;
`;

const MainText = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 0 0.875rem;
`;

const MainTextTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const MainTextContent = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

export default function Main() {
  return (
    <MainSection aria-labelledby="main-section__header">
      <MainImageWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://via.placeholder.com/500`} alt="main-image" />
      </MainImageWrapper>
      <MainText>
        <MainTextTitle id="main-section__header">MyShoes</MainTextTitle>
        <MainTextContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque ipsum
          quia aliquam ea aut minus tempora delectus id optio, totam dolorem
          placeat, quasi nam quisquam.
        </MainTextContent>
      </MainText>
    </MainSection>
  );
}
