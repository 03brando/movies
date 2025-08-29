import { memo, useState } from 'react';
import Link from 'next/link';

import { navLinks } from '@/config/routes';
import styles from './Header.module.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>CinematicIndex</Link>
      </div>
      <button
        aria-label="Toggle menu"
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.routes} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((route, key) => (
          <Link key={key} href={route.path} onClick={() => setMenuOpen(false)}>
            {route.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default memo(Header);
