import { useRouter } from 'next/router';

import MoviePage from '@/components/MoviePage/MoviePage';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <MoviePage id={Number(id)} />;
    </main>
  );
}
