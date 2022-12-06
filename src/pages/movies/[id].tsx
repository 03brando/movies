import { useRouter } from 'next/router';

import MoviePage from '../../components/MoviePage/MoviePage';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return <MoviePage id={Number(id)} />;
}
