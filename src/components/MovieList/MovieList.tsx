import classnames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { images } from '@/config/api';
import { routes } from '@/config/routes';
import { ListType, Result } from '@/data/interfaces';
import { getPopularMovies, getTopMovies } from '@/utils/api';
import useSWR from 'swr';
import styles from './MovieList.module.scss';

//TODO: add styling and animation

export type Props = {
  className?: string;
  title?: string;
  listType?: ListType;
  searchResults?: Result[];
};

const MovieList = memo(function MovieList({ className, title, listType, searchResults }: Props) {
  const mergeById = (previous: Result[], incoming: Result[]): Result[] => {
    const idToItem = new Map<number, Result>();
    for (const item of previous) idToItem.set(item.id, item);
    for (const item of incoming) idToItem.set(item.id, item);
    return Array.from(idToItem.values());
  };
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const swrKey = !searchResults && listType ? [`/movie/${listType === 'popular' ? 'popular' : 'top_rated'}`, { page }] : null;
  const { data: swrData } = useSWR(swrKey, { keepPreviousData: true });


  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const handleMovieClick = useCallback((id: number) => {
    router.push(routes.movie(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastMovieRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            list.length > 0 &&
            !loading &&
            !isFetching &&
            hasMore
          ) {
            setIsFetching(true);
            setPage((prevPage) => prevPage + 1);
          }
        },
        { root: null, rootMargin: '200px', threshold: 0 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, isFetching, hasMore, list.length]
  );

  async function getMovies() {
    if (listType === 'popular') {
      setLoading(true);
      const movies = swrData ?? (await getPopularMovies(page));
      const results = movies?.results ?? [];
      if (Array.isArray(results)) {
        setList((prev) => mergeById(prev, results));
        setHasMore(results.length > 0);
      }
      setLoading(false);
      setIsFetching(false);
    } else if (listType === 'top') {
      setLoading(true);
      const movies = swrData ?? (await getTopMovies(page));
      const results = movies?.results ?? [];
      if (Array.isArray(results)) {
        setList((prev) => mergeById(prev, results));
        setHasMore(results.length > 0);
      }
      setLoading(false);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setList(Array.from(new Map(searchResults.map((i) => [i.id, i])).values()));
      setHasMore(false);
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

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

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
            onMouseEnter={() => router.prefetch(routes.movie(id))}
          >
            <div className={styles.wrapper}>
              <h2 className={styles.title}>{`${title} (${release_date})`}</h2>
              <p className={styles.overview}>{overview}</p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                src={poster_path ? `${images.posterBaseUrl}${poster_path}` : '/placeholder-movie.svg'}
                alt={title}
                width={150}
                height={225}
                sizes="(max-width: 768px) 40vw, 150px"
                className={styles.img}
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-movie.svg';
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
