import pxToRem from "assets/theme/functions/pxToRem";

export const APP_SIDE_BAR_WIDTHS_KEYS = ["xs", "xl"] as const;
export type SideBarWidthsKeys = "xs" | "xl";

type SideBarWidthsOptions = {
	[x in SideBarWidthsKeys]: string;
}

export type SideBarWidthsType = {
	opened: SideBarWidthsOptions;
	closed: SideBarWidthsOptions;
}

export type SystemConstsType = {
	sideBarWidths: SideBarWidthsType;
};

const systemConsts: SystemConstsType = {
	sideBarWidths: {
		opened: {
			xs: pxToRem(250),
			xl: pxToRem(250),
		},
		closed: {
			xs: pxToRem(0),
			xl: pxToRem(48),
		},
	}
};

export default systemConsts;