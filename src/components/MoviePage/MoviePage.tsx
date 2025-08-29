import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { images } from '@/config/api';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Movie, Result } from '@/data/interfaces';
import { getMovieById, getRecommended } from '@/utils/api';
import Head from '@/components/Head/Head';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const genres = useMemo(() => {
    return movie ? movie.genres.map((genre, key) => <p key={key}>&nbsp;{genre.name}</p>) : null;
  }, [movie]);

  const recommendedMovies = useMemo(() => {
    return recommendations && recommendations.length > 0 ? (
      <div className={styles.recommendations}>
        {recommendations.map((movie) => (
          <div key={movie.id} className={styles.recommendation} onClick={() => handleClick(movie.id)}>
            <Image
              src={movie.poster_path ? `${images.posterBaseUrl}${movie.poster_path}` : '/placeholder-movie.svg'}
              alt={movie.title}
              width={200}
              height={300}
              className={styles.recImg}
              sizes="(max-width: 768px) 40vw, 200px"
              unoptimized
              onError={(e) => {
                e.currentTarget.src = '/placeholder-movie.svg';
              }}
            />
          </div>
        ))}
      </div>
    ) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendations]);

  const handleClick = useCallback((movieId: number) => {
    window.location.href = routes.movie(movieId);
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
        {recommendations && recommendations.length > 0 && (
          <h2 className={styles.recommendationsTitle}>Recommended Movies</h2>
        )}
        {recommendedMovies}
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={movie.backdrop_path ? `${images.posterBaseUrl}${movie.backdrop_path}` : '/placeholder-movie.svg'}
          alt={movie.title}
          className={styles.img}
          width={1280}
          height={720}
          sizes="100vw"
          unoptimized
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.svg';
          }}
        />
      </div>
    </main>
  );
}

export default memo(MoviePage);
