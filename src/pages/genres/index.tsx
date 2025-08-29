import classnames from 'classnames';
import { memo } from 'react';

import GenreList from '../../components/GenreList/GenreList';
import Head from '../../components/Head/Head';
import PageLayout from '../../components/PageLayout/PageLayout';
import ContentSection from '../../components/ContentSection/ContentSection';
import { meta } from '@/config/meta';
import styles from './index.module.scss';

function genres() {
  return (
    <PageLayout>
      <Head title={meta.genres.headTitle} />
      
      <div className={styles.genresPage}>
        <div className={styles.genresHeader}>
          <h1 className={styles.genresTitle}>Movie Genres</h1>
          <p className={styles.genresSubtitle}>Explore movies by genre and discover your perfect match</p>
        </div>

        <ContentSection>
          <GenreList />
        </ContentSection>
      </div>
    </PageLayout>
  );
}

export default memo(genres);
