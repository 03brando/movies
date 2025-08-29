import classnames from 'classnames';
import router from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';

import { genrePage } from '../../data/data';
import { Genre } from '../../data/interfaces';
import { getGenres } from '../../utils/api';
import styles from './GenreList.module.scss';

export type Props = {
  className?: string;
};

function GenreList({ className }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleGenreClick = useCallback((id: number) => {
    router.push(genrePage.route + id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };

    fetchData();
  }, []);

  return (
    <section className={classnames(styles.GenreList, className)}>
      <div className={styles.genresGrid}>
        {genres.map((genre, key) => (
          <div 
            key={key} 
            className={styles.genreCard} 
            onClick={() => handleGenreClick(genre.id)}
          >
            <div className={styles.genreContent}>
              <h3 className={styles.genreName}>{genre.name}</h3>
              <div className={styles.genreIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(GenreList);
