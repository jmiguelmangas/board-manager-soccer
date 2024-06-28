import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Player from './Player';
import playersData from '../data/players.json';

function Board() {
  const [players, setPlayers] = useState(playersData);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const fieldRef = useRef(null);

  const movePlayer = (id, x, y) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, position: { x, y } } : player
      )
    );
    setSelectedPlayerId(null); // Deselect player after moving
  };

  const handlePlayerClick = (id) => {
    setSelectedPlayerId(id);
  };

  const handleFieldClick = (e) => {
    if (selectedPlayerId !== null) {
      const fieldRect = fieldRef.current.getBoundingClientRect();
      const x = e.clientX - fieldRect.left;
      const y = e.clientY - fieldRect.top;
      movePlayer(selectedPlayerId, x, y);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board" onClick={handleFieldClick} ref={fieldRef}>
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
            selected={player.id === selectedPlayerId}
            onClick={handlePlayerClick}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default Board;
