import { forwardRef } from "react";

// Custom styles for MDTypography
import MDTypographyRoot from "components/GVTypography/GVTypographyRoot";
import { TypographyOwnProps, TypographyProps } from "@mui/material";
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";

// Material Dashboard 2 React contexts
// import { useMaterialUIController } from "context";

type GVTypographyProps = {
  color: GradientKeys & ExtraColorKeys;
  fontWeight?: string;
  textTransform?: string;
  verticalAlign?: string;
  textGradient?: string;
  opacity?: string;
  children?: React.ReactNode;
}

const GVTypography = forwardRef<unknown, GVTypographyProps & TypographyOwnProps & TypographyProps>(
  (
    { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, ...rest },
    ref
  ) => {
    // const [controller] = useMaterialUIController();
    // const { darkMode } = controller;

    return (
      <MDTypographyRoot
        {...rest}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode: 'false',
        }}
      >
        {children}
      </MDTypographyRoot>
    );
  }
);

export default GVTypography;