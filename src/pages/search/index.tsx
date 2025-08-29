import { memo } from 'react';

import Head from '../../components/Head/Head';
import SearchBar from '../../components/SearchBar/SearchBar';
import PageLayout from '../../components/PageLayout/PageLayout';
import ContentSection from '../../components/ContentSection/ContentSection';
import { meta } from '@/config/meta';
import styles from './index.module.scss';

function search() {
  return (
    <PageLayout>
      <Head title={meta.search.headTitle} />
      
      <div className={styles.searchPage}>
        <div className={styles.searchHeader}>
          <h1 className={styles.searchTitle}>Search Movies</h1>
          <p className={styles.searchSubtitle}>Find your next favorite film</p>
        </div>

        <ContentSection>
          <SearchBar />
        </ContentSection>
      </div>
    </PageLayout>
  );
}

export default memo(search);
