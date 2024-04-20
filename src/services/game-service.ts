import HttpService from "services/http";

export interface CreateGame {
	name: string;
	descrption?: string;
};

export class GameService {

	createGame = async (game: CreateGame) => {
		const createGameEndpoint = 'game';
		return HttpService.post(createGameEndpoint, game);
	}

}

export default new GameService();