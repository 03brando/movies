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
      <h1 className={styles.title}>{genrePage.title}</h1>
      <div className={styles.genres}>
        {genres.map((genre, key) => (
          <div key={key} className={styles.item} onClick={() => handleGenreClick(genre.id)}>
            <p className={styles.name}>{genre.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(GenreList);
