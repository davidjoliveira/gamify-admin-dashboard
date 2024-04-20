import { forwardRef } from "react";
import GVButtonRoot, { GVButtonRootOwnerState } from "components/GVButton/GVButtonRoot";
import { useMaterialUIController } from "context";
import { ButtonProps } from "@mui/material";

const GVButton = forwardRef<HTMLButtonElement, ButtonProps & GVButtonRootOwnerState>(
	({ color, variant, size, circular, iconOnly, children, customVariant, ...rest }, ref) => {
		const [controller] = useMaterialUIController();
		const { darkMode } = controller;

		return (
			<GVButtonRoot
				{...rest}
				ref={ref}
				color="primary"
				variant={customVariant as string === "gradient" ? "contained" : customVariant as "text" | "outlined" | "contained" | undefined}
				size={size}
				ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
			>
				{children}
			</GVButtonRoot>
		);
	}
);

export default GVButton;