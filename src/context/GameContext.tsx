import { createContext } from 'react';
import type { GameContextType } from './GameProvider';

export const GameContext = createContext<GameContextType | undefined>(undefined);