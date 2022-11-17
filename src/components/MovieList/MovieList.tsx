import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Result } from '../../data/interfaces';
import { apiRoutes } from '../../data/data';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './MovieList.module.scss';
import { getPopularMovies, getTopMovies } from '../../utils/api';

export type Props = {
  className?: string;
  title: string;
};

//TODO: add functionality to use a list for search results, toprated movies, etc
//TODO: add inifinte scroll

function MovieList({ className, title }: Props) {
  const [list, setList] = useState<Result[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPopularMovies(page).then((data) => setList(data.results));
  }, [page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      console.log('Delayed for 5 second.');
    }, 5000);
    setPage(page + 1);
    const prevData = list;
    getPopularMovies(page).then((data) => setList([...prevData, ...data.results]));
  };

  const moreMovies = () => {
    return list.length < 1000;
  };

  return (
    <section className={classnames(styles.MovieList, className)}>
      <h1>{title}</h1>

      <InfiniteScroll dataLength={list.length} next={fetchMoreData} hasMore={moreMovies()} loader={<h4>Loading...</h4>}>
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
      </InfiniteScroll>
    </section>
  );
}

export default memo(MovieList);
