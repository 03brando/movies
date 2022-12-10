import classnames from 'classnames';
import { memo, useEffect, useState } from 'react';

import { Result } from '../../data/interfaces';
import { getMoviesByGenre } from '../../utils/api';
import styles from './GenrePage.module.scss';

export type Props = {
  className?: string;
  id: number;
};

function GenrePage({ className, id }: Props) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await getMoviesByGenre(id);
        setResults(response);
      } catch (error) {
        console.log('Error fetching and parsing data', error);
      }
    }

    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classnames(styles.GenrePage, className)}>
      <h1>Genre Page</h1>
    </div>
  );
}

export default memo(GenrePage);
