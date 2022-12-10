import classnames from 'classnames';
import { memo, useEffect, useState } from 'react';

import { Result } from '../../data/interfaces';
import { getMoviesByGenre } from '../../utils/api';
import MovieList from '../MovieList/MovieList';
import styles from './GenrePage.module.scss';

export type Props = {
  className?: string;
  id: number;
};

function GenrePage({ className, id }: Props) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function getMovies() {
      if (id && id !== 0) {
        try {
          const response = await getMoviesByGenre(Number(id));
          console.log(response);
          setResults(response.results);
        } catch (error) {
          console.log('Error fetching and parsing data', error);
        }
      }
    }

    getMovies();
  }, [id]);

  return (
    <div className={classnames(styles.GenrePage, className)}>
      <MovieList searchResults={results} />
    </div>
  );
}

export default memo(GenrePage);
