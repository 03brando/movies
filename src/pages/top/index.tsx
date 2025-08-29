import classnames from 'classnames';
import { memo } from 'react';

import Head from '../../components/Head/Head';
import MovieList from '../../components/MovieList/MovieList';
import PageLayout from '../../components/PageLayout/PageLayout';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContentSection from '../../components/ContentSection/ContentSection';
import { topPage } from '../../data/data';
import { ListType } from '../../data/interfaces';

const lt = topPage.listType as ListType;

const topStats = [
  { number: '9.0+', label: 'Average Rating' },
  { number: '100K+', label: 'Votes' },
  { number: 'All Time', label: 'Greatest Hits' }
];

function top() {
  return (
    <PageLayout>
      <Head title={topPage.headTitle} />
      
      <HeroSection
        title="Top Rated Movies"
        subtitle="Discover the highest-rated films of all time. From critically acclaimed masterpieces to audience favorites, explore movies that have earned the highest praise and ratings."
        stats={topStats}
      />

      <ContentSection>
        <MovieList title={topPage.title} listType={lt} />
      </ContentSection>
    </PageLayout>
  );
}

export default memo(top);
