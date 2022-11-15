import Head from 'next/head';
import Image from 'next/image';
import styles from './Home.module.scss';

export default function Home() {
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
