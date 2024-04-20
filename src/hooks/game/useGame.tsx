import { useState } from "react";

const useGame = (gameUUID: string | undefined = undefined) => {
	const [currentGame, setCurrentGame] = useState(gameUUID);
}
export default useGame;