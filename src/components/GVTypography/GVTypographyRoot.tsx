import Typography, { TypographyOwnProps, TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";

type GVTypographyRootOwnerState = {
  color: GradientKeys & ExtraColorKeys;
  textTransform?: string;
  verticalAlign?: string;
  fontWeight?: string;
  opacity?: string;
  textGradient?: string;
  darkMode?: string;
}

type GVTypographyRootProps = {
  ownerState: GVTypographyRootOwnerState;
}

type FontWeightKeys = "light" | "regular" | "medium" | "bold";
type FontWeights = {
  [key in FontWeightKeys]: any;
}

export default styled(Typography)<GVTypographyRootProps & TypographyOwnProps>(({ theme, ownerState }) => {
  const { palette, typography, functions } = theme;
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient, darkMode } =
    ownerState;

  const { gradients, transparent, white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights: FontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
        ? linearGradient(gradients[color as GradientKeys].main, gradients[color as GradientKeys].state)
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    // position: "relative",
    zIndex: 1,
  });

  // color value
  let colorValue = color === "inherit" || !palette[color] ? "inherit" : palette[color as GradientKeys].main;

  // if (darkMode && (color === "inherit" || !palette[color])) {
  //   colorValue = "inherit";
  // } else if (darkMode && color === "dark") colorValue = white.main;
  let weight: any = fontWeights[fontWeight as FontWeightKeys] && fontWeights[fontWeight as FontWeightKeys];
  return {
    opacity,
    // textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    fontWeight: weight,
    ...(textGradient && gradientStyles()),
  };
});