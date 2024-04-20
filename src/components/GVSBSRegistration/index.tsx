import React, { forwardRef, useState } from "react";

import StyledBreadcrumb from "./styled-breadcrumb";
import GVSBSRegistrationRoot from "./GVSBSRegistrationRoot";
import { Breadcrumbs, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import GVBox from "components/GVBox";
import GVButton from "components/GVButton";
import { FullPalletColorsKeys } from "assets/theme/base/colors";
import { useForm } from "react-hook-form";

export type GVSBSRegistrationPropsOptions = {
	width: number | string;
	hight: number | string;
	top: number | string;
}

export type GVSBSRegistrationPropsStep = {
	showFinishButton?: boolean;
	name: string;
	title: string;
	icon?: string;
	Body: React.ReactElement;
	onFinish: (...p: any) => any;
	onCancel?: (...p: any) => any;
	onNext?: (...p: any) => any;
}

export type GVSBSRegistrationProps = {
	steps: Array<GVSBSRegistrationPropsStep>;
	opened: boolean;
	options?: GVSBSRegistrationPropsOptions;
}

const GVSBSRegistration = forwardRef<HTMLDivElement, GVSBSRegistrationProps>(({ steps, opened, options, ...rest }, ref) => {
	const {
    register,
    formState,
    handleSubmit,
  } = useForm();
	const [currentStep, setCurrentStep] = useState(0);

	const onSubmitNext = async () => {
		if (currentStep === steps.length) {
			onSubmitFinish();
			return;
		}
		const onNext = steps[currentStep]?.onNext;
		onNext && await onNext();
		setCurrentStep((c) => c + 1);
	};

	const onSubmitFinish = async () => {
		const onFinish = steps[currentStep]?.onFinish;
		onFinish && await onFinish();
	}

	const handleCloseRegistration = async () => {
		const onCancel = steps[currentStep]?.onCancel;
		onCancel && await onCancel();
	};

	const handleClickBreadCrumb = (stepIndex: number) => () => setCurrentStep(stepIndex);

	const getBreadcrumbs = (steps: Array<GVSBSRegistrationPropsStep>) => {
		return steps.map((step: GVSBSRegistrationPropsStep, index: number) => (<StyledBreadcrumb component="a" onClick={handleClickBreadCrumb(index)} href="#" label={step.name} key={step.name} />));
	}
	
	const createRegistrationView = () => {
		return steps[currentStep].Body;
		// return Body && <Body register={register} formState={formState} {...rest} />
	}

	return (
		<GVSBSRegistrationRoot ref={ref} backgroundColor="transparent" open={opened} onClose={handleCloseRegistration} {...options}>
			<DialogTitle>{steps[currentStep].title}</DialogTitle>
			<DialogContent>
				<GVBox display="flex" flexDirection="column" mb={2}>
					<Breadcrumbs>
						{getBreadcrumbs(steps)}
					</Breadcrumbs>
				</GVBox>
				<GVBox component="form" role="form" display="flex" justifyContent="center" id="main-form">
					{createRegistrationView()}
				</GVBox>
			</DialogContent>
			<DialogActions>
				{currentStep + 1 < steps.length && (
					<GVButton customVariant="gradient" color={"info" as FullPalletColorsKeys} onClick={() => onSubmitNext()}>Próximo</GVButton>
				)}
				{(steps[currentStep].showFinishButton !== false || currentStep + 1 === steps.length) && (
					<GVButton customVariant="gradient" color={"info" as FullPalletColorsKeys} onClick={() => onSubmitFinish()}>Finalizar</GVButton>
				)}
			</DialogActions>
		</GVSBSRegistrationRoot>
	);
});

export default GVSBSRegistration;