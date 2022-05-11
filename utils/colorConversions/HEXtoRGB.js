export default function HEXtoRGB(hex) {
  let r, g, b, _r, _g, _b;
  _r = hex.substring(1, 3);
  _g = hex.substring(3, 5);
  _b = hex.substring(5, 7);
  r = parseInt(_r, 16);
  g = parseInt(_g, 16);
  b = parseInt(_b, 16);
  return { r, g, b };
}