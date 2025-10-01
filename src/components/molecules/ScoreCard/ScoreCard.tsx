import React from 'react';
import { Text } from '../../atoms/Text/Text';
import styles from './ScoreCard.module.scss';

interface ScoreCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className={styles.scoreCard}>
      <div className={styles.icon} style={{ color }}>
        {icon}
      </div>
      <div className={styles.content}>
        <Text variant="caption" className={styles.label}>
          {label}
        </Text>
        <Text variant="title" className={styles.value}>
          {value}
        </Text>
      </div>
    </div>
  );
};