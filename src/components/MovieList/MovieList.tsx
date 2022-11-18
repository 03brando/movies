import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { ListType, Result } from '../../data/interfaces';
import { apiRoutes } from '../../data/data';

import styles from './MovieList.module.scss';
import { getPopularMovies, getTopMovies, getMovieBySearch } from '../../utils/api';

export type Props = {
  className?: string;
  title: string;
  listType: ListType;
  searchQuery?: string;
};

//TODO: add functionality to use a list for search results, toprated movies, etc
//TODO: add inifinte scroll

function MovieList({ className, title, listType }: Props) {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const dataFetchedRef = useRef(false);

  const getMovies = useCallback(async () => {
    if (listType === 'popular') {
      const movies = await getPopularMovies(page);
      setList(movies.results);
    }

    if (listType === 'top') {
      const movies = await getTopMovies(page);
      setList(movies.results);
    }

    if (listType === 'search') {
      const movies = await getMovieBySearch('star wars', page);
      setList(movies.results);
    }
  }, [listType, page]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={classnames(styles.MovieList, className)}>
      <h1>{title}</h1>

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
      </div>
    </section>
  );
}

export default memo(MovieList);
