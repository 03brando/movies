import { memo } from 'react';
import classnames from 'classnames';
import Head from 'next/head';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movies</title>
        <meta name="description" content="A movie database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Movies</h1>
    </div>
  );
}

export default memo(Home);
