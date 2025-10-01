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

export interface PinPlacement {
  lat: number;
  lng: number;
  distance: number;
  isCorrect: boolean;
}