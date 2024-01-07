import { useState } from 'react';
import { levels, findPlayerPosition } from './Level';

export function usePlayer(level) {
  const [playerPosition, setPlayerPosition] = useState(findPlayerPosition(levels[level]));
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  function movePlayer(newPosition) {
    if (isLevelComplete) {
      return; // Ignore the move if the level is complete
    }
    setPlayerPosition(newPosition);
  }

  function completeLevel() {
    setIsLevelComplete(true); // Call this function when the level is completed
  }

  return { playerPosition, movePlayer, completeLevel };
}