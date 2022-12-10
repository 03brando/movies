import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { apiRoutes, moviePage } from '../../data/data';
import { Movie, Result } from '../../data/interfaces';
import { getMovieById, getRecommended } from '../../utils/api';
import Head from '../Head/Head';
import styles from './MoviePage.module.scss';

type Props = {
  id: number;
};

function MoviePage({ id }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Result[]>([]);

  useEffect(() => {
    if (typeof id === 'number' && isFinite(id)) {
      getMovieById(id).then(setMovie);
      getRecommended(id).then(setRecommendations);
    }
  }, [id, movie]);

  const genres = useMemo(() => {
    return movie ? movie.genres.map((genre, key) => <p key={key}>&nbsp;{genre.name}</p>) : null;
  }, [movie]);

  const recommendedMovies = useMemo(() => {
    return recommendations && recommendations.length > 0 ? (
      <div className={styles.recommendations}>
        {recommendations.map((movie) => (
          <div key={movie.id} className={styles.recommendation} onClick={() => handleClick(movie.id)}>
            <Image
              src={`${apiRoutes.posterPathURL + movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className={styles.recImg}
            />
          </div>
        ))}
      </div>
    ) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendations]);

  const handleClick = useCallback((movieId: number) => {
    window.location.href = moviePage.route + movieId;
  }, []);

  if (!movie) return null;

  return (
    <main className={styles.MoviePage}>
      <Head title={movie.title} />
      <div className={styles.details}>
        <div className={styles.movieInfo}>
          <h1 className={styles.pageTitle}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.releaseDate}> </p>
          <div className={styles.genres}>
            <p className={styles.genreText}>Genres:</p>
            {genres}
          </div>
        </div>
        <h2 className={styles.recHeader}>Similar Movies</h2>
        {recommendedMovies}
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
