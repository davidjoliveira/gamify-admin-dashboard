import React, { forwardRef } from "react";
import MDBoxRoot from "./GVBoxRoot";

type GVBoxOwnerProps = {
  variant: string;
  bgColor: string;
  color: string;
  opacity: string;
  borderRadius: string;
  shadow: string;
  coloredShadow: string;
  children: React.ReactNode;
  [x:string]: any;
}

const GVBox = forwardRef<HTMLElement, GVBoxOwnerProps>(
  ({ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }, ref) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);


export default GVBox;