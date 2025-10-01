import React from 'react';
import { ScoreCard } from '../../molecules/ScoreCard/ScoreCard';
import styles from './GameStats.module.scss';

interface GameStatsProps {
  score: number;
  citiesFound: number;
  highScore: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ score, citiesFound, highScore }) => {
  return (
    <div className={styles.gameStats}>
      <ScoreCard
        icon="🎯"
        label="Kilometers Left"
        value={`${score} km`}
        color="#667eea"
      />
      <ScoreCard
        icon="🏆"
        label="Cities Found"
        value={citiesFound}
        color="#f59e0b"
      />
      <ScoreCard
        icon="⭐"
        label="High Score"
        value={highScore}
        color="#10b981"
      />
    </div>
  );
};