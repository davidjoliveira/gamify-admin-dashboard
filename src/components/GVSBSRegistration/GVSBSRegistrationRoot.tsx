import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

type GVSBSRegistrationRootProps = {
	backgroundColor?: string;
	width?: number | string;
}

export default styled(Dialog)<GVSBSRegistrationRootProps>(({ backgroundColor, width, theme }) => {
	const { palette, boxShadows, borders, functions, breakpoints } = theme;
	const { xxl } = boxShadows;
	const { borderRadius: { xl } } = borders;
	const { background: { secondaryGradient } } = palette;

	const { linearGradient } = functions;

	let background = linearGradient(secondaryGradient.main, secondaryGradient.state);
	if (backgroundColor) {
		background = linearGradient(backgroundColor, backgroundColor);
	}

	return {
		boxShadow: xxl,
		border: xl,
		background,
		'& .MuiPaper-root': {
			width: "calc(100vw - 40px)",
			[breakpoints.up("xl")]: {
				width: "50%",
			}	
		},
	};
});