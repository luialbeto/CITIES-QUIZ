import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  onPress,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const handleClick = () => {
    if (onPress) onPress();
    if (onClick) onClick();
  };

  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classNames}
    >
      {children}
    </button>
  );
};