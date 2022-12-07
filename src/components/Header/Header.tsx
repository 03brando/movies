import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';

import { navLinks } from '../../data/data';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>CinematicIndex</p>
      </div>
      <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.routes} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((route, key) => (
          <a key={key} href={(router.pathname = route.path)} onClick={() => setMenuOpen(false)}>
            {route.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default memo(Header);
