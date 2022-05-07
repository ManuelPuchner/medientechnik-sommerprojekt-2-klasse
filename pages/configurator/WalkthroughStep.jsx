import styled from "styled-components";
import { ColorPicker } from "components/colorpicker";

const WalkthroughStepWrapper = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;

  & > .color-picker {
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 10;
  }
  /* & > * {
    z-index: 2;
  } */
`;

export default function WalkthroughStep({ colors, setColors, _for, children }) {
  return (
    <WalkthroughStepWrapper>
      {!children && <h2>{_for}</h2>}
      {!children && (
        <ColorPicker
          onChange={(color) => setColors({ ...colors, [_for]: color })}
        />
      )}

      {children}
    </WalkthroughStepWrapper>
  );
}
