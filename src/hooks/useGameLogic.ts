import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import type { GameContextType } from '../context/GameProvider';

export const useGameLogic = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameLogic must be used within GameProvider');
  }

  return context;
};