import classnames from 'classnames';
import { memo } from 'react';

import Head from '@/components/Head/Head';
import MovieList from '@/components/MovieList/MovieList';
import { homePage } from '@/data/data';
import { ListType } from '@/data/interfaces';
import styles from './Home.module.scss';

type Props = {
  className: string;
};

const lt = homePage.listType as ListType;

function Home({ className }: Props) {
  return (
    <main className={styles.container}>
      <Head title={homePage.headTitle} />
      <MovieList title={homePage.title} listType={lt} />
    </main>
  );
}

export default memo(Home);
