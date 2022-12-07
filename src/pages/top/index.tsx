import classnames from 'classnames';
import { memo } from 'react';

import Head from '../../components/Head/Head';
import MovieList from '../../components/MovieList/MovieList';
import { topPage } from '../../data/data';
import { ListType } from '../../data/interfaces';
import styles from './index.module.scss';

const lt = topPage.listType as ListType;

function top() {
  return (
    <main className={classnames(styles.top)}>
      <Head title={topPage.headTitle} />
      <MovieList title={topPage.title} listType={lt} />
    </main>
  );
}

export default memo(top);
