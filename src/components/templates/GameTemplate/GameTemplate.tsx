import React from 'react';
import { GameHeader } from '../../organisms/GameHeader/GameHeader';
import styles from './GameTemplate.module.scss';

interface GameTemplateProps {
  children: React.ReactNode;
}

export const GameTemplate: React.FC<GameTemplateProps> = ({ children }) => {
  return (
    <div className={styles.gameTemplate}>
      <div className={styles.container}>
        <GameHeader />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};