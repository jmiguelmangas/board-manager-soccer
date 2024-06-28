import React, { useState } from 'react';

function Player({ id, number, position, selected, onClick }) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`player ${selected ? 'selected' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        position: 'absolute',
        cursor: 'pointer',
      }}
    >
      {number}
    </div>
  );
}

export default Player;
