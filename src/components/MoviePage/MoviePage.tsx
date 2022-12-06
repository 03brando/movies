import React, { useEffect, useState } from 'react';

import { apiRoutes } from '../../data/data';
import { Movie } from '../../data/interfaces';
import { getMovieById } from '../../utils/api';
import styles from './MoviePage.module.scss';

type Props = {
  id: number;
};

function MoviePage({ id }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovie() {
      const movie = await getMovieById(id);
      setMovie(movie);
    }
    getMovie();
  }, [id]);

  if (!movie) return null;

  return (
    <section className={styles.MoviePage}>
      <h1 className={styles.pageTitle}>{movie.title}</h1>
      <p className={styles.overview}>{movie.overview}</p>
    </section>
  );
}

export default MoviePage;
