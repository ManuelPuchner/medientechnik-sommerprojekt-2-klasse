/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import toPascalCase from "utils/toPascalCase";

const CollectionsSection = styled.section``;

const SliderWrapper = styled.div`
  max-width: 100vw;
  overflow: hidden;
`;

const CollectionSliderWrapper = styled.div``;

const CustomSplide = styled(Splide)`
  & img {
    display: block;
    margin: 0 auto;
    width: 80%;
  }
`;

const CustomSplideSlide = styled(SplideSlide)``;

export default function Collections() {
  const collectionImages = {
    "black-edition": [
      { path: "/sneakers/black-edition/green.png", alt: "black-edition-green" },
      { path: "/sneakers/black-edition/red.png", alt: "black-edition-red" },
      { path: "/sneakers/black-edition/pink.png", alt: "black-edition-pink" },
      {
        path: "/sneakers/black-edition/orange.png",
        alt: "black-edition-orange",
      },
    ],
    edition1: [
      { path: "/sneakers/edition1/orange.png", alt: "edition1-orange" },
      { path: "/sneakers/edition1/aqua.png", alt: "edition1-aqua" },
      { path: "/sneakers/edition1/pink.png", alt: "edition1-pink" },
    ],
    edition2: [
      { path: "/sneakers/edition2/purple.png", alt: "edition2-purple" },
      { path: "/sneakers/edition2/aqua.png", alt: "edition2-aqua" },
      {
        path: "/sneakers/edition2/orange-green.png",
        alt: "edition2-orange-green",
      },
    ],
  };
  return (
    <CollectionsSection>
      <h1>Collections</h1>
      <SliderWrapper>
        {Object.keys(collectionImages).map((collection) => (
          <>
            <h2>{toPascalCase(collection)}</h2>
            <CustomSplide aria-label={collection}>
              {collectionImages[collection].map((shoe) => (
                <>
                  <CustomSplideSlide>
                    <h3>{toPascalCase(shoe.alt || "")}</h3>
                    <img src={shoe.path} alt={shoe.alt}></img>
                  </CustomSplideSlide>
                </>
              ))}
            </CustomSplide>
          </>
        ))}
      </SliderWrapper>
    </CollectionsSection>
  );
}
