import { memo } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';
import MovieList from '../../components/MovieList/MovieList';

import { topPage } from '../../data/data';
import { ListType } from '../../data/interfaces';

const lt = topPage.listType as ListType;

function top() {
  return (
    <main className={classnames(styles.top)}>
      <Head />
      <MovieList title={topPage.title} listType={lt} />
    </main>
  );
}

export default memo(top);
