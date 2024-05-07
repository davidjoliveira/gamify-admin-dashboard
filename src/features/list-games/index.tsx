import useGames, { GameData } from "hooks/game/useGames";
import GVBox from "components/GVBox";
import GameCard from "./GameCard";

export default function ListGames() {
  const [games, setGames] = useGames();
  return (
    <GVBox>
      {games.map((g: GameData) => (<GameCard {...g} />))}
    </GVBox>
  )
}