import classnames from 'classnames';
import { memo } from 'react';

import Head from '@/components/Head/Head';
import MovieList from '@/components/MovieList/MovieList';
import PageLayout from '@/components/PageLayout/PageLayout';
import HeroSection from '@/components/HeroSection/HeroSection';
import ContentSection from '@/components/ContentSection/ContentSection';
import { homePage } from '@/data/data';
import { ListType } from '@/data/interfaces';

type Props = {
  className: string;
};

const lt = homePage.listType as ListType;

const homeStats = [
  { number: '10K+', label: 'Movies' },
  { number: '50+', label: 'Genres' },
  { number: '24/7', label: 'Updated' }
];

function Home({ className }: Props) {
  return (
    <PageLayout>
      <Head title={homePage.headTitle} />
      
      <HeroSection
        title="CinematicIndex"
        subtitle="Discover the world's most captivating films. From blockbuster hits to hidden gems, explore thousands of movies with detailed information, ratings, and recommendations."
        stats={homeStats}
      />

      <ContentSection>
        <MovieList title={homePage.title} listType={lt} />
      </ContentSection>
    </PageLayout>
  );
}

export default memo(Home);
