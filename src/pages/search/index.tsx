import { memo } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';
import MovieList from '../../components/MovieList/MovieList';

import { searchPage } from '../../data/data';
import { ListType } from '../../data/interfaces';

const lt = searchPage.listType as ListType;

//TODO: add search bar and fujnctionality

function search() {
  return (
    <main className={classnames(styles.search)}>
      <Head />
      <MovieList title={searchPage.title} listType={lt} />
    </main>
  );
}

export default memo(search);
