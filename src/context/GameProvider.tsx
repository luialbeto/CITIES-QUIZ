import React, { useState, useCallback, useEffect } from 'react';
import { GameContext } from './GameContext';
import { StorageService } from '../services/storageService';
import { DistanceService } from '../services/distanceService';
import citiesData from '../data/cities.json';

export interface City {
  capitalCity: string;
  lat: number;
  long: number;
}

export interface GameState {
  score: number;
  citiesFound: number;
  currentCityIndex: number;
  cities: City[];
  gameOver: boolean;
  highScore: number;
  lastDistance: number | null;
  isCorrect: boolean | null;
}

export interface GameContextType {
  gameState: GameState;
  startNewGame: () => void;
  placePin: (lat: number, lng: number) => void;
  resetGame: () => void;
}

interface GameProviderProps {
  children: React.ReactNode;
}

const INITIAL_SCORE = 1500;

const initialGameState: GameState = {
  score: INITIAL_SCORE,
  citiesFound: 0,
  currentCityIndex: 0,
  cities: citiesData.capitalCities,
  gameOver: false,
  highScore: 0,
  lastDistance: null,
  isCorrect: null,
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const highScore = StorageService.getHighScore();
    StorageService.clearGameState();

    return {
      ...initialGameState,
      highScore,
    };
  });

  useEffect(() => {
    if (gameState.gameOver && gameState.citiesFound > gameState.highScore) {
      StorageService.saveHighScore(gameState.citiesFound);
    }
  }, [gameState.gameOver, gameState.citiesFound, gameState.highScore]);

  const startNewGame = useCallback(() => {
    StorageService.clearGameState();
    setGameState({
      ...initialGameState,
      highScore: StorageService.getHighScore(),
    });
  }, []);

  const placePin = useCallback((lat: number, lng: number) => {
    setGameState((prevState: GameState) => {
      const currentCity = prevState.cities[prevState.currentCityIndex];
      const result = DistanceService.calculatePinPlacement(
        lat,
        lng,
        currentCity.lat,
        currentCity.long
      );

      const newScore = DistanceService.calculateNewScore(prevState.score, result.distance);
      const newCitiesFound = result.isCorrect ? prevState.citiesFound + 1 : prevState.citiesFound;
      const newGameOver = newScore <= 0;
      const nextCityIndex = (prevState.currentCityIndex + 1) % prevState.cities.length;

      if (newGameOver && newCitiesFound > prevState.highScore) {
        StorageService.saveHighScore(newCitiesFound);
      }

      return {
        ...prevState,
        score: newScore,
        citiesFound: newCitiesFound,
        currentCityIndex: newGameOver ? prevState.currentCityIndex : nextCityIndex,
        gameOver: newGameOver,
        highScore: newGameOver && newCitiesFound > prevState.highScore 
          ? newCitiesFound 
          : prevState.highScore,
        lastDistance: result.distance,
        isCorrect: result.isCorrect,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  const value: GameContextType = React.useMemo(() => ({
    gameState,
    startNewGame,
    placePin,
    resetGame,
  }), [gameState, startNewGame, placePin, resetGame]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};