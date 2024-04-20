import colors from "./colors";
import pxToRem from "../functions/pxToRem";

type BorderWidth = {
  0: number | string;
  1: number | string;
  2: number | string;
  3: number | string;
  4: number | string;
  5: number | string;
};

export const ALL_BORDER_RADIUS_KEYS = ["xs", "sm", "md", "lg", "xl", "xxl", "section"] as const;
export type BordersRadiusKeys = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "section";

type BorderRadius = {
  [x in BordersRadiusKeys]: string;
};

export type SystemBorders = {
  borderColor: string | undefined;
  borderWidth: BorderWidth;
  borderRadius: BorderRadius;
};

const { grey } = colors;

const borders: SystemBorders = {
  borderColor: grey && grey[300],

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(2),
    md: pxToRem(6),
    lg: pxToRem(8),
    xl: pxToRem(12),
    xxl: pxToRem(16),
    section: pxToRem(160),
  },
};

export default borders;