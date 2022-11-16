import { memo } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Result } from '../../data/interfaces';

import styles from './MovieList.module.scss';
import { release } from 'os';

export type Props = {
  className?: string;
  list: Result[];
};

//TODO: cleanup data
const posterLink = 'https://image.tmdb.org/t/p/original';

function MovieList({ className, list }: Props) {
  return (
    <div className={classnames(styles.MovieList, className)}>
      {list.map(({ id, title, overview, release_date, poster_path }, index) => (
        <div className={classnames(styles.item)} key={index}>
          <h3 className={styles.title}>
            {title} <span>({new Date(release_date).toDateString()})</span>
          </h3>
          <p className={styles.overview}>{overview}</p>
          <div className={styles.imgWrapper}>
            <Image
              src={`${posterLink + poster_path}`}
              alt={title}
              layout="fill"
              loading="lazy"
              className={styles.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(MovieList);
