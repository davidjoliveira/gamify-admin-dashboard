import chroma from "chroma-js";

function hexToRgb(color: string = "white") {
  return chroma(color).rgb().join(", ");
}

export default hexToRgb;