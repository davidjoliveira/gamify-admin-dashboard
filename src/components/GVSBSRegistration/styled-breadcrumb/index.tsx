import { emphasize, styled } from '@mui/material/styles';
import Chip, { ChipProps } from '@mui/material/Chip';
import React from 'react';

type StyledBreadcrumbProps = {
	children: React.ReactNode;
}

const StyledBreadcrumb = styled(Chip)<StyledBreadcrumbProps & ChipProps>(({ theme }) => {
	const backgroundColor =
		theme.palette.mode === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[800];
	return {
		backgroundColor,
		height: theme.spacing(3),
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover, &:focus': {
			backgroundColor: emphasize(backgroundColor, 0.06),
		},
		'&:active': {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(backgroundColor, 0.12),
		},
	};
}) as typeof Chip;

export default StyledBreadcrumb;