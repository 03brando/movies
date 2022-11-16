import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
import Head from '../components/Head/Head';
import { Result } from '../data/interfaces';
import { GetStaticProps } from 'next';
import Image from 'next/image';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
      );
      const jsonData = await data.json();
      setResult(jsonData.results);
    };
    api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
