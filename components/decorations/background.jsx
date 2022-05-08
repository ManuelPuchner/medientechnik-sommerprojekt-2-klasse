import styled from "styled-components";
import Circle from "./Circle";
import Rect from "./Rect";
import Triangle from "./Triangle";

let colors = {
  pink: { r: 255, g: 160, b: 249 },
  yellow: { r: 255, g: 242, b: 52 },
  green: { r: 174, g: 255, b: 97 },
  blue: { r: 126, g: 255, b: 247 },
  purple: { r: 188, g: 155, b: 255 },
  orange: { r: 255, g: 184, b: 104 },
};

let rgbColors = {};
Object.keys(colors).map((key) => {
  rgbColors[key] = `rgb(${colors[key].r}, ${colors[key].g}, ${colors[key].b})`;
});

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

function Background() {
  return (
    <BackgroundWrapper>
      <Rect color={rgbColors.yellow} rotation={45} x={5} y={5} size={16} />
      <Rect color={rgbColors.green} rotation={35} x={40} y={2} size={18} />
      <Triangle color={rgbColors.blue} rotation={90} x={70} y={4} size={12} />
      <Circle color={rgbColors.pink} x={98} y={1} size={18} />
      <Triangle color={rgbColors.blue} rotation={50} x={15} y={92} size={12} />

      <Rect color={rgbColors.orange} rotation={50} x={95} y={90} size={20} />

      {/* <Triangle color={rgbColors.pink} rotation={30} x={50} y={50} size={12} /> */}
      {/* <Rect color={rgbColors.pink} rotation={60} x={50} y={50} size={12} /> */}
      {/* <Circle color={rgbColors.pink} x={50} y={50} size={10} /> */}
    </BackgroundWrapper>
  );
}

export default Background;
