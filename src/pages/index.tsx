import classnames from 'classnames';
import { memo } from 'react';

import Head from '@/components/Head/Head';
import MovieList from '@/components/MovieList/MovieList';
import { homePage } from '@/data/data';
import { ListType } from '@/data/interfaces';
import styles from './Home.module.scss';

type Props = {
  className: string;
};

const lt = homePage.listType as ListType;

function Home({ className }: Props) {
  return (
    <main className={styles.container}>
      <Head title={homePage.headTitle} />
      
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>CinematicIndex</h1>
        <p className={styles.heroSubtitle}>
          Discover the world's most captivating films. From blockbuster hits to hidden gems, 
          explore thousands of movies with detailed information, ratings, and recommendations.
        </p>
        
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>10K+</div>
            <div className={styles.statLabel}>Movies</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Genres</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Updated</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <MovieList title={homePage.title} listType={lt} />
      </div>
    </main>
  );
}

export default memo(Home);
