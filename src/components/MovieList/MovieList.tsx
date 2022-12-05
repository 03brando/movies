import classnames from 'classnames';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { apiRoutes } from '../../data/data';
import { ListType, Result } from '../../data/interfaces';
import { getMovieBySearch, getPopularMovies, getTopMovies } from '../../utils/api';
import styles from './MovieList.module.scss';

export type Props = {
  className?: string;
  title?: string;
  listType: ListType;
  searchQuery?: string;
};

//TODO: add inifinte scroll

function MovieList({ className, title, listType, searchQuery }: Props) {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMoreResults, setNoMoreResults] = useState<boolean>(false);
  const dataFetchedRef = useRef(false);

  const getMovies = useCallback(async () => {
    if (listType === 'popular') {
      const movies = await getPopularMovies(page);
      setList((prevList) => [...prevList, ...movies.results]);
    }

    if (listType === 'top') {
      const movies = await getTopMovies(page);
      setList((prevList) => [...prevList, ...movies.results]);
    }

    if (listType === 'search' && searchQuery) {
      const movies = await getMovieBySearch(searchQuery, page);
      setList((prevList) => [...prevList, ...movies.results]);
    }
  }, [listType, page, searchQuery]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading)
      return;

    setLoading(true);
  }, [loading]);

  useEffect(() => {
    if (!loading) return;

    setPage((prevPage) => prevPage + 1);
    getMovies();
    setLoading(false);
  }, [loading, getMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className={classnames(styles.MovieList, className)}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}

      <div className={styles.itemWrapper}>
        {list.map(({ id, title, overview, release_date, poster_path }, index) => (
          <div className={classnames(styles.item)} key={index}>
            <div className={styles.wrapper}>
              <h3 className={styles.title}>{`${title} (${release_date})`}</h3>
              <p className={styles.overview}>{overview}</p>
            </div>
            <div className={styles.imgWrapper}>
              <Image
                src={`${apiRoutes.posterPathURL + poster_path}`}
                alt={title}
                layout="fill"
                loading="lazy"
                className={styles.img}
              />
            </div>
          </div>
        ))}
        {noMoreResults && <p className={styles.noMoreResults}>No more results</p>}
      </div>
    </section>
  );
}

export default memo(MovieList);
