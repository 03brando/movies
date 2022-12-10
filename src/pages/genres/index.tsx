import classnames from 'classnames';
import { memo } from 'react';

import GenreList from '../../components/GenreList/GenreList';
import Head from '../../components/Head/Head';
import { genrePage } from '../../data/data';
import styles from './index.module.scss';

function genres() {
  return (
    <main className={classnames(styles.genres)}>
      <Head title={genrePage.headTitle} />
      <GenreList />
    </main>
  );
}

export default memo(genres);
