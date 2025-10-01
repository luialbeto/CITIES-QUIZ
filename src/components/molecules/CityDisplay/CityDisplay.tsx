import React from 'react';
import { Text } from '../../atoms/Text/Text';
import styles from './CityDisplay.module.scss';

interface CityDisplayProps {
  cityName: string;
  citiesRemaining: number;
}

export const CityDisplay: React.FC<CityDisplayProps> = ({ cityName, citiesRemaining }) => {
  return (
    <div className={styles.cityDisplay}>
      <Text variant="caption" align="center">
        Find the location of:
      </Text>
      <Text variant="title" align="center" className={styles.cityName}>
        {cityName}
      </Text>
      <Text variant="caption" align="center" className={styles.remaining}>
        {citiesRemaining} cities remaining
      </Text>
    </div>
  );
};