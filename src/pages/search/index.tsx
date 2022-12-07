import classnames from 'classnames';
import { memo, useCallback, useState } from 'react';

import Head from '../../components/Head/Head';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { searchPage } from '../../data/data';
import { ListType } from '../../data/interfaces';
import styles from './index.module.scss';

function search() {
  return (
    <main className={classnames(styles.search)}>
      <Head title={searchPage.headTitle} />
      <SearchBar />
    </main>
  );
}

export default memo(search);
