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
                setColors({ ...colors, laces: color });
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Mesh</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, mesh: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Caps</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, caps: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Inner</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, inner: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Sole</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, sole: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Stripes</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, stripes: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Band</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, band: color })}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Patch</label>
            <ColorPicker
              onChange={(color) => setColors({ ...colors, patch: color })}
            />
          </InputWrapper>
        </div>
      </ConfigurationWrapper>
    </>
  );
}
