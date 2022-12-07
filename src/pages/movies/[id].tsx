import { useRouter } from 'next/router';

import Head from '../../components/Head/Head';
import MoviePage from '../../components/MoviePage/MoviePage';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <MoviePage id={Number(id)} />;
    </main>
  );
}
