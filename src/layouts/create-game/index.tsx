import { useState } from "react";
import { useForm } from "react-hook-form";

import { setCreatingGame, useMaterialUIController } from "context";

import GVSBSRegistration from "components/GVSBSRegistration";
import CreateGameFormRoot from "./CreateGameFormRoot";
import gameService from "services/game-service";

function CreateGame() {
	const {
    register,
    formState,
    handleSubmit,
  } = useForm();
	const [controller, dispatch] = useMaterialUIController();
	const [isCreatingGame, setIsCreatingGame] = useState(false);
	const [gameCreationStatus, setGameCreationStatus] = useState(null);
	const { creatingGame } = controller;
	
	const submitCreateGame = async (data: any) => {
		const r = await gameService.createGame({name: data.gameName, description: data.gameDescription});
		if (!!r) {

		}
	}

	const steps = [
		{
			Body: <CreateGameFormRoot register={register} formState={formState}/>, 
			title: "Dados do Jogo", 
			name: "Criar jogo",
			onFinish: () => handleSubmit(submitCreateGame)(), 
			onNext: async () => {
				handleSubmit(submitCreateGame)();
			},
			onCancel: () => setCreatingGame(dispatch, false),
		},
		{
			Body: <CreateGameFormRoot register={register} formState={formState}/>, 
			title: "Dados do Jogo", 
			name: "Criar Ações",
			showFinishButton: false,
			onFinish: () => null, 
			onNext: () => null,
			onCancel: () => setCreatingGame(dispatch, false),
		}
	];

	return (
		<GVSBSRegistration opened={creatingGame} steps={steps} />
	);
}

export default CreateGame;