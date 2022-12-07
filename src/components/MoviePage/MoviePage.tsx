import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { apiRoutes } from '../../data/data';
import { Movie } from '../../data/interfaces';
import { getMovieById } from '../../utils/api';
import styles from './MoviePage.module.scss';

type Props = {
  id: number;
};

//TODO: add styling and animation
//TODO: add similar movies
//TODO: add more details

function MoviePage({ id }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovie() {
      const movie = await getMovieById(id);
      setMovie(movie);
    }
    console.log(movie);
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!movie) return null;

  return (
    <section className={styles.MoviePage}>
      <div className={styles.details}>
        <h1 className={styles.pageTitle}>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={`${apiRoutes.posterPathURL + movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          className={styles.img}
        />
      </div>
    </section>
  );
}

export default MoviePage;
