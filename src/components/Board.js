import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Player from './Player';
import playersData from '../data/players.json'; // Importar el JSON local

function Board() {
  const [players, setPlayers] = useState(playersData);

  const movePlayer = (id, x, y) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, position: { x, y } } : player
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <div className="field">
          <div className="penalty-area" />
          <div className="penalty-area right" />
          <div className="goal-area" />
          <div className="goal-area right" />
          <div className="center-circle" />
          <div className="center-line" />
          <div className="penalty-spot" />
          <div className="penalty-spot right" />
        </div>
        {players.map(player => (
          <Player
            key={player.id}
            id={player.id}
            number={player.number}
            position={player.position}
            movePlayer={movePlayer}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default Board;
