import { memo } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Result } from '../../data/interfaces';
import { apiRoutes } from '../../data/data';

import styles from './MovieList.module.scss';

export type Props = {
  className?: string;
  title: string;
  list: Result[];
};

function MovieList({ className, title, list }: Props) {
  return (
    <section className={classnames(styles.MovieList, className)}>
      <h1>{title}</h1>
      <div className={styles.itemWrapper}>
        {list.map(({ id, title, overview, release_date, poster_path }, index) => (
          <div className={classnames(styles.item)} key={index}>
            <h3 className={styles.title}>
              {title} <span className={styles.date}>({new Date(release_date).toDateString()})</span>
            </h3>
            <p className={styles.overview}>{overview}</p>
            <div className={styles.imgWrapper}>
              <Image
                src={`${apiRoutes.posterPath + poster_path}`}
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
