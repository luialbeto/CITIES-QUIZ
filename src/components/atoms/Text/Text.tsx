import React from 'react';
import styles from './Text.module.scss';

interface TextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  variant?: 'body' | 'caption' | 'title' | 'subtitle';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  color?: string;
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  weight = 'normal',
  align = 'left',
  color,
  children,
  className = '',
}) => {
  const classNames = [
    styles.text,
    styles[variant],
    styles[weight],
    styles[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} style={{ color }}>
      {children}
    </Component>
  );
};