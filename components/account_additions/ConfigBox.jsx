import styled from "styled-components";
import { HEXtoRGB } from "utils/colorConversions";

const ColorBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* background: red; */
  box-shadow: 0px 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(0.5rem);
  padding: 0.3rem;
  border-radius: 0.3rem;
`;
const ColorBox = styled.div`
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  width: calc(25% - 0.3rem);
  text-align: center;
  padding: 0.3em;
  box-sizing: border-box;
  margin: 0.15rem;
  border-radius: 0.2rem;
  border: 0.0001px black solid;
`;

export default function ConfigBox({ config }) {
  const getLuminance = (hexColor) => {
    const { r, g, b } = HEXtoRGB(hexColor);
    return r * 0.299 + g * 0.587 + b * 0.114;
  };
  return (
    <>
      <ColorBoxesWrapper>
        {Object.keys(config.colors).map((key, index) => {
          let fontColor =
            getLuminance(config.colors[key]) > 186 ? "black" : "white";
          return (
            <ColorBox
              key={index}
              color={config.colors[key]}
              fontColor={fontColor}
            >
              {key}
            </ColorBox>
          );
        })}
      </ColorBoxesWrapper>
    </>
  );
}
