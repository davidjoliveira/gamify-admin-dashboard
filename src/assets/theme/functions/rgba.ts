import hexToRgb from "assets/theme/functions/hexToRgb";

function rgba(color: string | undefined, opacity: string | number) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;