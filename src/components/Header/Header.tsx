import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';

import { navLinks } from '../../data/data';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={classnames(styles.header)}>
      <div className={styles.logo}>
        <p>CinematicIndex</p>
      </div>
      <button
        aria-label="toggle nav menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className={classnames(styles.menuButton, {
          [styles.menuButtonOpen]: menuOpen
        })}
      >
        <svg
          viewBox="0 0 20 20"
          className={classnames(styles.menuSvg, {
            [styles.menuSvgOpen]: menuOpen
          })}
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <div
        className={classnames(styles.routes, {
          [styles.routesOpen]: menuOpen
        })}
      >
        {navLinks.map((route) => (
          <a key={route.path} href={(router.pathname = route.path)}>
            {route.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default memo(Header);
