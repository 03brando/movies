import { memo } from 'react';
import classnames from 'classnames';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
import Head from '../components/Head/Head';
import { homePage } from '../data/data';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  return (
    <main className={styles.container}>
      <Head />
      <MovieList title={homePage.title} />
    </main>
  );
}

export default memo(Home);
