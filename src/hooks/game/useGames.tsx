import { useEffect, useState } from "react";
import gameService from "services/game-service";

export type GameData = {
  name: string;
  externalUUID: string;
}

const useGames = () => {
	const [games, setGames] = useState<GameData[]>([]);

	useEffect(() => {
		const getGames = async () => {
			const games: any[] = (await gameService.getGames()) as any[];
			setGames(games.map((g: any) => ({ name: g.name, externalUUID: g.externalUUID })));
		}
		getGames();
	}, []);

	return [games, setGames] as [GameData[], typeof setGames];
}
export default useGames;