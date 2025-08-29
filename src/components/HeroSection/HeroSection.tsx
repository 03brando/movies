import { ReactNode } from 'react';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  stats?: Array<{
    number: string;
    label: string;
  }>;
  children?: ReactNode;
}

export default function HeroSection({ title, subtitle, stats, children }: HeroSectionProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSubtitle}>{subtitle}</p>
      
      {stats && (
        <div className={styles.heroStats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      {children}
    </div>
  );
}
