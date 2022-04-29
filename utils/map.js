const map = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
export default map;