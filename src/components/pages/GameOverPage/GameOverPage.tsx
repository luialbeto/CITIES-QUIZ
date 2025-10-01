import React from 'react';
import { useGameLogic } from '../../../hooks/useGameLogic';
import { GameTemplate } from '../../templates/GameTemplate/GameTemplate';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import styles from './GameOverPage.module.scss';

export const GameOverPage: React.FC = () => {
  const { gameState, startNewGame } = useGameLogic();

  return (
    <GameTemplate>
      <div className={styles.gameOver}>
        <div className={styles.trophy}>🏆</div>
        <Text as="h1" variant="title" align="center">
          Game Over!
        </Text>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <Text variant="caption" align="center">
              Cities Found
            </Text>
            <Text as="div" variant="title" align="center" className={styles.statValue}>
              {gameState.citiesFound}
            </Text>
          </div>

          <div className={styles.statItem}>
            <Text variant="caption" align="center">
              High Score
            </Text>
            <Text as="div" variant="title" align="center" className={styles.statValue}>
              {gameState.highScore}
            </Text>
          </div>
        </div>

        {gameState.citiesFound === gameState.highScore && gameState.citiesFound > 0 && (
          <div className={styles.newRecord}>
            <Text variant="body" align="center">
              🎉 New High Score! 🎉
            </Text>
          </div>
        )}

        <Button onPress={startNewGame} size="large" fullWidth>
          Play Again
        </Button>

        <div className={styles.message}>
          <Text variant="caption" align="center">
            You ran out of kilometers! Better luck next time!
          </Text>
        </div>
      </div>
    </GameTemplate>
  );
};