import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  PLAYER: 'player',
};

function Player({ id, number, position, movePlayer }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { id, left: position.x, top: position.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, position.x, position.y]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      let x = Math.round(item.left + delta.x);
      let y = Math.round(item.top + delta.y);
      movePlayer(id, x, y);
    },
  }), [id, movePlayer]);

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="player"
      style={{
        left: position.x,
        top: position.y,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {number}
    </div>
  );
}

export default Player;
