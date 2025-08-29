import { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={`${styles.pageLayout} ${className || ''}`}>
      {children}
    </main>
  );
}
