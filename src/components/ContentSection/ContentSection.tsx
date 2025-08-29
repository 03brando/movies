import { ReactNode } from 'react';
import styles from './ContentSection.module.scss';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

export default function ContentSection({ children, className }: ContentSectionProps) {
  return (
    <div className={`${styles.contentSection} ${className || ''}`}>
      {children}
    </div>
  );
}
