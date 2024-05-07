import React from "react";
import { GameData } from "hooks/game/useGames";
import { Link } from "react-router-dom";

export default function GameCard({ name, externalUUID }: GameData) {
  return (
    <Link to={`game/${externalUUID}`} >
      <p>{name}</p>
    </Link>
  )
}