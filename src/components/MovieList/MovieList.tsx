import classnames from 'classnames';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { images } from '@/config/api';
import { routes } from '@/config/routes';
import { ListType, Result } from '@/data/interfaces';
import { getPopularMovies, getTopMovies } from '@/utils/api';
import styles from './MovieList.module.scss';

//TODO: add styling and animation

export type Props = {
  className?: string;
  title?: string;
  listType?: ListType;
  searchResults?: Result[];
};

const MovieList = memo(function MovieList({ className, title, listType, searchResults }: Props) {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const handleMovieClick = useCallback((id: number) => {
    router.push(routes.movie(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastMovieRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && list.length > 0) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, list]
  );

  async function getMovies() {
    if (listType === 'popular') {
      const movies = await getPopularMovies(page);
      if (movies && movies.results && Array.isArray(movies.results)) {
        const updatedList = new Set([...list, ...movies.results]);
        setList(Array.from(updatedList));
      }
    } else if (listType === 'top') {
      const movies = await getTopMovies(page);
      if (movies && movies.results && Array.isArray(movies.results)) {
        const updatedList = new Set([...list, ...movies.results]);
        setList(Array.from(updatedList));
      }
    }
  }

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setList(searchResults);
    } else if (!dataFetched) {
      setDataFetched(true);
      getMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType, page, searchResults, dataFetched]);

  useEffect(() => {
    if (page > 1) {
      getMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section className={classnames(styles.MovieList, className)}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}

      <div className={styles.itemWrapper}>
        {list.map(({ id, title, overview, release_date, poster_path }, index) => (
          <div
            className={classnames(styles.item)}
            key={index}
            ref={index === list.length - 1 ? lastMovieRef : null}
            onClick={() => handleMovieClick(id)}
          >
            <div className={styles.wrapper}>
              <h2 className={styles.title}>{`${title} (${release_date})`}</h2>
              <p className={styles.overview}>{overview}</p>
            </div>
            <div className={styles.imgWrapper}>
              <img
                src={poster_path ? `${images.posterBaseUrl}${poster_path}` : '/placeholder-movie.svg'}
                alt={title}
                loading="lazy"
                width={150}
                height={225}
                className={styles.img}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-movie.svg';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default memo(MovieList);
