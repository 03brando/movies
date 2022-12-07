import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';
import { createContext } from 'react';

import { apiRoutes } from '../../data/data';
import { Movie, Result } from '../../data/interfaces';
import { getMovieById, getRecommended } from '../../utils/api';
import Head from '../Head/Head';
import styles from './MoviePage.module.scss';

type Props = {
  id: number;
};

//TODO: add styling and animation
//TODO: add similar movies
//TODO: add more details

function MoviePage({ id }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Result[]>([]);

  useEffect(() => {
    async function getMovie() {
      const movie = await getMovieById(id);
      setMovie(movie);
    }

    //get recommended movies
    async function getRecommendedMovies() {
      const recommended = await getRecommended(id);
      setRecommendations(recommended);
      console.log('recommended', recommended);
    }

    console.log(movie);
    getMovie();
    getRecommendedMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!movie) return null;

  return (
    <main className={styles.MoviePage}>
      <Head title={movie.title} />
      <div className={styles.details}>
        <h1 className={styles.pageTitle}>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>
        <p className={styles.releaseDate}> </p>
        {recommendations.length > 0 && (
          <div className={styles.recommendations}>
            <h2 className={styles.recommendationsTitle}>Similar Movies</h2>
            {recommendations.map((movie) => (
              <div key={movie.id} className={styles.recommendation}>
                <p>{movie.title}</p>
                {/* <Image
                  src={`${apiRoutes.posterPathURL + movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                /> */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={`${apiRoutes.posterPathURL + movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          className={styles.img}
        />
      </div>
    </main>
  );
}

export default memo(MoviePage);
