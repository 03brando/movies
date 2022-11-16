import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
import Head from '../components/Head/Head';
import { Result } from '../data/interfaces';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { fetchAPI } from '../utils/api';
import { homePage } from '../data/data';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    fetchAPI(`${homePage.url}1`).then((data) => setResult(data));
  }, []);

  return (
    <div className={styles.container}>
      <Head />
      <h1>Top Movies</h1>
      <MovieList list={result} />
    </div>
  );
}

export default memo(Home);
