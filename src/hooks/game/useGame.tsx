import { useEffect, useState } from "react";
import gameService from "services/game-service";

export type GameData = {
  name: string;
  description: string | null;
  externalUUID: string;
}

const useGame = (gameUUID: string) => {
	const [games, setGame] = useState<GameData | null>(null);

	useEffect(() => {
		const getGames = async () => {
			const game: GameData = (await gameService.getGame(gameUUID)) as GameData;
			setGame(game);
		}
		getGames();
	}, []);

	return [games, setGame] as [GameData, typeof setGame];
}
export default useGame;