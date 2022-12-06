import classnames from 'classnames';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { apiRoutes } from '../../data/data';
import { ListType, Result } from '../../data/interfaces';
import { getPopularMovies, getTopMovies } from '../../utils/api';
import styles from './MovieList.module.scss';

export type Props = {
  className?: string;
  title?: string;
  listType?: ListType;
  searchResults?: Result[];
};

function MovieList({ className, title, listType, searchResults }: Props) {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

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
      const updatedList = new Set([...list, ...movies.results]);
      setList(Array.from(updatedList));
    } else if (listType === 'top') {
      const movies = await getTopMovies(page);
      const updatedList = new Set([...list, ...movies.results]);
      setList(Array.from(updatedList));
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
          <div className={classnames(styles.item)} key={index} ref={index === list.length - 1 ? lastMovieRef : null}>
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
      </div>
    </section>
  );
}

export default memo(MovieList);
