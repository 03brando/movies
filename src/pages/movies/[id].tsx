import { useRouter } from 'next/router';

import MoviePage from '../../components/MoviePage/MoviePage';
import { moviePage } from '../../data/data';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <MoviePage id={Number(id)} subtitle={moviePage.subtitle} tag={moviePage.tag} />;
    </main>
  );
}
