// import { Card } from "@mui/material";
// import { styled } from "@mui/material/styles";

// export default styled(Card)(({ theme }) => {
// 	return {};
// });
import React from "react";
import GVBox from "components/GVBox";
import GVInput from "components/GVInput";
import { FormState, UseFormRegister, useForm } from "react-hook-form";
import GVTypography from "components/GVTypography";
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";
import GameService, { CreateGame } from "services/game-service";

export interface CreateGameFormData {
	gameName: string;
	gameDescription: string;
}

type CreateGameFormRootType = {
	register: UseFormRegister<CreateGameFormData | any>;
	formState: FormState<CreateGameFormData | any>;
}

type GameNameConstraints = "required" | "minLength" | "maxLength";

const messagesDict = {
	required: "O nome do jogo deve ser informado",
	minLength: "O nome do jogo deve ter no mínimo 5 caracteres",
	maxLength: "O nome do jogo deve ter no máximo 30 caracteres",
} as const;

const CreateGameFormRoot = ({ register, formState }: CreateGameFormRootType) => {
	const { errors } = formState;

	return (
		<GVBox display="flex" flexDirection="column" alignItems="flex-start" width="80%">
			<GVInput 
				label="Nome do jogo"
				error={errors.gameName ? true : false}
				type="text"
				{...register("gameName", { required: true, minLength: 5, maxLength: 30 })}
				fullWidth />
			{errors.gameName && (
				<GVTypography
					variant="caption"
					color={"error" as GradientKeys & ExtraColorKeys}
					fontWeight="light">
						{messagesDict[errors.gameName.type as GameNameConstraints]}
				</GVTypography>
			)}
			<GVInput
				label="Descrição do jogo"
				multiline
				rows={5}
				{...register("gameDescription")}
				sx={{marginTop: 3}}
				fullWidth/>
		</GVBox>
	);
}

const submitCreateGame = async (data: any) => {
	return GameService.createGame({name: data.gameName, description: data.gameDescription});
}

export default CreateGameFormRoot;
export {
	submitCreateGame,
};