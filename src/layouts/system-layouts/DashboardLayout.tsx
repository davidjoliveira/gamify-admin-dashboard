import React from "react";
import { Transitions } from "@mui/material";
import { Theme } from "@mui/material/styles";

import { useMaterialUIController } from "context";

import GVBox from "components/GVBox";
import { SideBarWidthsType } from "assets/theme/base/systemConsts";

type DashboardLayout = {
	children: React.ReactNode,
}

function DashboardLayout({ children }: DashboardLayout) {
	const [controller, dispatch] = useMaterialUIController();
	const { miniSidenav } = controller;

	const smallScreenStyles = (sideBarWidths: SideBarWidthsType) => {
		const left = miniSidenav ? sideBarWidths.closed.xs : sideBarWidths.opened.xs
		return {
			left,
			width: `calc(100vw - ${left})`,
		};
	}

	const bigScreenStyles = (sideBarWidths: SideBarWidthsType) => {
		const left = miniSidenav ? sideBarWidths.closed.xl : sideBarWidths.opened.xl
		return {
			left,
			width: `calc(100vw - ${left})`,
		};
	}

	const getTransitions = (transitions: Transitions) => ({
		transition: transitions.create(["margin-left", "margin-right"], {
			easing: transitions.easing.easeInOut,
			duration: transitions.duration.enteringScreen,
		})
	});

 	return (
		<GVBox 
			bgColor="secondaryGradient" 
			variant="themeBackgroundColor" 
			sx={({ breakpoints, systemConsts: { sideBarWidths }, transitions }: Theme) => ({
				position: "relative",
				minHeight: "100vh",
				[breakpoints.down("xl")]: {
					...smallScreenStyles(sideBarWidths),
					...getTransitions(transitions),
				},
				[breakpoints.up("xl")]: {
					...bigScreenStyles(sideBarWidths),
					...getTransitions(transitions),
				},
			})}
		>
			{ children }
		</GVBox>
	);
}

export default DashboardLayout;