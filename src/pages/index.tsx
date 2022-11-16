import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import Head from 'next/head';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
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
      <Head>
        <title>Movies</title>
        <meta name="description" content="A movie database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Top Movies</h1>
      {result.map(({ id, title, overview, release_date, poster_path }, index) => (
        <div className={classnames(styles.item)} key={index}>
          <h3>{title}</h3>
          <p>{overview}</p>
          <div className={styles.imgWrapper}>
            <Image
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
              layout="fill"
              className={styles.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Home);
