import HttpService from "services/http";

export interface CreateGame {
	name: string;
	description?: string;
};

export class GameService {

	createGame = async (game: CreateGame) => {
		const createGameEndpoint = 'game';
		return HttpService.post(createGameEndpoint, game);
	}

	getGames = async () => {
		const getGamesEndpoint = 'game';
		return HttpService.get(getGamesEndpoint);
	}

	getGame = async (gameUUID: string) => {
		const getGameEndpoint = `game/${gameUUID}`;
		return HttpService.get(getGameEndpoint);
	}

}

export default new GameService();