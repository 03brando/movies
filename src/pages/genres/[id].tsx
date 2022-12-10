import { useRouter } from 'next/router';

import GenrePage from '../../components/GenrePage/GenrePage';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <GenrePage id={Number(id)} />;
    </main>
  );
}
