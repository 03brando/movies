import { memo } from 'react';

import Head from '@/components/Head/Head';
import MovieList from '@/components/MovieList/MovieList';
import PageLayout from '@/components/PageLayout/PageLayout';
import HeroSection from '@/components/HeroSection/HeroSection';
import ContentSection from '@/components/ContentSection/ContentSection';
import { meta } from '@/config/meta';
import { ListType } from '@/data/interfaces';

const lt = 'popular' as ListType;

const homeStats = [
  { number: '10K+', label: 'Movies' },
  { number: '50+', label: 'Genres' },
  { number: '24/7', label: 'Updated' }
];

function Home() {
  return (
    <PageLayout>
      <Head title={meta.home.headTitle} />
      
      <HeroSection
        title="CinematicIndex"
        subtitle="Discover the world's most captivating films. From blockbuster hits to hidden gems, explore thousands of movies with detailed information, ratings, and recommendations."
        stats={homeStats}
      />

      <ContentSection>
        <MovieList title={meta.home.title} listType={lt} />
      </ContentSection>
    </PageLayout>
  );
}

export default memo(Home);
