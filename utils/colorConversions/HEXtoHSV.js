function HEXtoRGB(hex) {
  let r, g, b, _r, _g, _b;
  _r = hex.substring(1, 3);
  _g = hex.substring(3, 5);
  _b = hex.substring(5, 7);
  r = parseInt(_r, 16);
  g = parseInt(_g, 16);
  b = parseInt(_b, 16);
  return { r, g, b };
}

function RGBtoHSV({ r, g, b }) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min,
    h,
    s,
    v;
  if (max === 0) {
    h = 0;
  } else {
    s = delta / max;
    switch (max) {
      case r:
        h = (g - b) / delta;
        if (g < b) {
          h += 6;
        }
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
      default:
        h = 0;
        break;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;

    s = Math.round(s * 100);
    v = Math.round(max * 100);
    return { h, s, v };
  } else {
    s = Math.round(s * 100);
    v = Math.round(max * 100);
    return { h, s, v };
  }
}

function HEXtoHSV(hex) {
  let rgb = HEXtoRGB(hex);
  return RGBtoHSV(rgb);
}

export default HEXtoHSV;
