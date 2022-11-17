import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
import Head from '../components/Head/Head';
import { Result } from '../data/interfaces';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { getTopMovies } from '../utils/api';
import { apiRoutes, homePage } from '../data/data';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const [topMovies, setTopMovies] = useState<Result[]>([]);

  useEffect(() => {
    getTopMovies().then((data) => setTopMovies(data));
  }, []);

  return (
    <main className={styles.container}>
      <Head />
      <MovieList list={topMovies} title={homePage.title} />
    </main>
  );
}

export default memo(Home);
