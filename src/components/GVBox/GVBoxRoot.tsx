import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ALL_BORDER_RADIUS_KEYS, BordersRadiusKeys } from "assets/theme/base/borders";
import { ALL_BOX_SHADOWS_KEYS, BoxShadowsKeys, ColoredType } from "assets/theme/base/boxShadows";
import { CustomBackgroundKeys, GradientKeys, ALL_CUSTOM_BACKGROUND_KEYS, ALL_GREY_COLORS_KEYS } from "assets/theme/base/colors";

type GVBoxRootPropsOwnerState = {
  variant: string;
  bgColor: string;
  color: string;
  opacity: string;
  borderRadius: string;
  shadow: string;
  coloredShadow: string;
}

type GVBoxRootProps = {
  ownerState: GVBoxRootPropsOwnerState;
}

type GreyColorsKeys = "grey-100" | "grey-200" | "grey-300" | "grey-400" | "grey-500" | "grey-600" | "grey-700" | "grey-800" | "grey-900";

export default styled(Box)<GVBoxRootProps>(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

  const { gradients, grey, white, background } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  const greyColors = {
    "grey-100": grey && grey[100],
    "grey-200": grey && grey[200],
    "grey-300": grey && grey[300],
    "grey-400": grey && grey[400],
    "grey-500": grey && grey[500],
    "grey-600": grey && grey[600],
    "grey-700": grey && grey[700],
    "grey-800": grey && grey[800],
    "grey-900": grey && grey[900],
  };

  const validGradients = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  const validColors = [
    "transparent",
    "white",
    "black",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
  ].concat(ALL_GREY_COLORS_KEYS);

  let backgroundValue: string | undefined = bgColor;
  if (variant === "gradient") {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor as GradientKeys].main, gradients[bgColor as GradientKeys].state)
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor as GradientKeys] ? palette[bgColor as GradientKeys].main : greyColors[bgColor as GreyColorsKeys];
  } else if(variant === "inherit") {
    backgroundValue = "inherit";
  } else if (variant === "themeBackgroundColor" && ALL_CUSTOM_BACKGROUND_KEYS.includes(bgColor as CustomBackgroundKeys)) {
    backgroundValue = linearGradient(background[bgColor as CustomBackgroundKeys].main, background[bgColor as CustomBackgroundKeys].state);
  } else {
    backgroundValue = bgColor;
  }

  let colorValue: string | undefined = color;
  if (validColors.find((el) => el === color)) {
    colorValue = palette[color as GradientKeys] ? palette[color as GradientKeys].main : greyColors[color as GreyColorsKeys];
  }

  let borderRadiusValue = borderRadius;
  if (ALL_BORDER_RADIUS_KEYS.find((el) => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius as BordersRadiusKeys];
  }

  let boxShadowValue: string | ColoredType = "none";
  if (ALL_BOX_SHADOWS_KEYS.find((el) => el === shadow)) {
    boxShadowValue = boxShadows[shadow as BoxShadowsKeys];
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : "none";
  }

  return {
    opacity,
    background: backgroundValue ? backgroundValue : "white",
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue as string,
  };
});