const hsvToHsl = (h, s, v, l = v * (1 - s / 2)) => [
  h,
  l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l),
  l,
];
export default hsvToHsl;