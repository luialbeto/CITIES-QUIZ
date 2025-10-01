import Cookies from 'js-cookie';

const COOKIE_EXPIRY_DAYS = 365;
const HIGH_SCORE_COOKIE_NAME = 'cities_quiz_high_score';

export interface GameState {
  score: number;
  citiesFound: number;
  currentCityIndex: number;
}

export class StorageService {
  static saveHighScore(score: number): void {
    try {
      Cookies.set(HIGH_SCORE_COOKIE_NAME, score.toString(), {
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: 'strict',
      });
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  }

  static getHighScore(): number {
    try {
      const score = Cookies.get(HIGH_SCORE_COOKIE_NAME);
      return score ? parseInt(score, 10) : 0;
    } catch (error) {
      console.error('Failed to get high score:', error);
      return 0;
    }
  }

  static saveGameState(gameState: Partial<GameState>): void {
  }

  static getGameState(): Partial<GameState> | null {
    return null;
  }

  static clearGameState(): void {
    // empty
  }
}