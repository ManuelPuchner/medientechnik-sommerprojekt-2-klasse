import styled from "styled-components";
import { ColorPicker } from "components/colorpicker";
const ConfigurationWrapper = styled.div`
  display: flex;
  position: absolute;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

export default function ConfigurationElements({ colors, setColors }) {
  return (
    <>
      <ConfigurationWrapper>
        <h3>Colors</h3>
        <div>
          <InputWrapper>
            <label>Laces</label>
            {/* <input
              type="color"
              name=""
              id=""
              onChange={(e) => setColors({ ...colors, laces: e.target.value })}
            /> */}
            <ColorPicker
              // onChange={(e) => setColors({ ...colors, laces: e.target.value })}
              onChange={(color) => {
                setColors({ ...colors, laces: color })
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Mesh</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, mesh: e.target.value })}
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Caps</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, caps: e.target.value })}
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Inner</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, inner: e.target.value })}
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Sole</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, sole: e.target.value })}
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Stripes</label>
            {/* <ColorPicker
              onChange={(e) =>
                setColors({ ...colors, stripes: e.target.value })
              }
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Band</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, band: e.target.value })}
            /> */}
          </InputWrapper>
          <InputWrapper>
            <label>Patch</label>
            {/* <ColorPicker
              onChange={(e) => setColors({ ...colors, patch: e.target.value })}
            /> */}
          </InputWrapper>
        </div>
      </ConfigurationWrapper>
    </>
  );
}
