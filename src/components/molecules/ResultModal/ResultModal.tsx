import React, { useEffect } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import styles from './ResultModal.module.scss';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  distance: number;
  cityName: string;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  isCorrect,
  distance,
  cityName,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.underlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.content}>
          <div className={`${styles.icon} ${isCorrect ? styles.correct : styles.incorrect}`}>
            {isCorrect ? '🎯' : '📍'}
          </div>
          <Text variant="title" align="center" id="modal-title">
            {isCorrect ? 'Great Job!' : 'Not Quite!'}
          </Text>
          <Text variant="body" align="center" className={styles.message}>
            You were <strong>{distance} km</strong> away from {cityName}
          </Text>
          {isCorrect && (
            <Text variant="caption" align="center" className={styles.success}>
              Within 50km - City found! ✓
            </Text>
          )}
          <Button onPress={onClose} fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};