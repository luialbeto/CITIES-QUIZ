import React from 'react';
import { Text } from '../../atoms/Text/Text';
import styles from './GameHeader.module.scss';

export const GameHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Text as="h1" variant="title" className={styles.title}>
          🗺️ Cities Quiz Game
        </Text>
        <Text variant="caption" className={styles.subtitle}>
          Find European cities on the map!
        </Text>
      </div>
    </header>
  );
};