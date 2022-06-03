/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import toPascalCase from "utils/toPascalCase";

const OurProductsSection = styled.section``;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductCard = styled.div`
  flex: 1;
  width: 33.33333%;
  margin: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 80%;
  margin: 0 auto;
  display: block;
`;

const ProductType = styled.h3``;

const ProductPrice = styled.p``;

export default function OurProducts() {
  const products = [
    {
      type: "shoe",
      default_image: {
        src: "/sneakers/default.png",
        alt: "default shoe",
      },
      price: ["basic", "50€"],
    },
    {
      type: "shoe",
      default_image: {
        src: "/sneakers/default.png",
        alt: "default shoe",
      },
      price: ["advanced", "100€"],
    },
    {
      type: "shoe",
      default_image: {
        src: "/sneakers/default.png",
        alt: "default shoe",
      },
      price: ["premium", "200€"],
    },
  ];
  return (
    <OurProductsSection>
      <h1>Our Products</h1>
      <Flex>
        {products.map((product) => (
          <>
            <ProductCard>
              <ProductImage
                src={product.default_image.src}
                alt={product.default_image.alt}
              />
              <ProductType>{toPascalCase(product.type)}</ProductType>
              <ProductPrice>
                {toPascalCase(product.price[0])}: <span>{product.price[1]}</span>
              </ProductPrice>
            </ProductCard>
          </>
        ))}
      </Flex>
    </OurProductsSection>
  );
}
