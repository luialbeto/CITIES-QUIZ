import Cookies from 'js-cookie';
import { COOKIE_EXPIRY_DAYS, HIGH_SCORE_COOKIE_NAME, GAME_STATE_COOKIE_NAME } from '@utils/constants';
import type { GameState } from '@types/game.types';


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
    try {
      localStorage.setItem(GAME_STATE_COOKIE_NAME, JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }


  static getGameState(): Partial<GameState> | null {
    try {
      const state = localStorage.getItem(GAME_STATE_COOKIE_NAME);
      return state ? JSON.parse(state) : null;
    } catch (error) {
      console.error('Failed to get game state:', error);
      return null;
    }
  }


  static clearGameState(): void {
    try {
      localStorage.removeItem(GAME_STATE_COOKIE_NAME);
    } catch (error) {
      console.error('Failed to clear game state:', error);
    }
  }
}