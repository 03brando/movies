import { memo } from 'react';
import classnames from 'classnames';
import styles from './Home.module.scss';
import MovieList from '../components/MovieList/MovieList';
import Head from '../components/Head/Head';
import { homePage } from '../data/data';
import { ListType } from '../data/interfaces';

type Props = {
  className: string;
};

const lt = homePage.listType as ListType;

function Home({ className }: Props) {
  return (
    <main className={styles.container}>
      <Head />
      <MovieList title={homePage.title} listType={lt} />
    </main>
  );
}

export default memo(Home);
