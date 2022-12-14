import classnames from 'classnames';
import { memo } from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { searchPage } from '../../data/data';
import { ListType, Result } from '../../data/interfaces';
import { getMovieBySearch } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MovieList from '../MovieList/MovieList';
import styles from './SearchBar.module.scss';

// Define the props type for the SearchBar component
type Props = {
  className?: string;
};

//TODO: add styling and animation

const lt = searchPage.listType as ListType;

function SearchBar({ className }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResultsCache, setSearchResultsCache] = useState<{
    [query: string]: Result[];
  }>({});
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    async function search() {
      try {
        setIsLoading(true);

        if (searchResultsCache[debouncedQuery]) {
          setResults(searchResultsCache[debouncedQuery]);
          setIsLoading(false);
          return;
        }

        const response = await getMovieBySearch(debouncedQuery);
        const searchResults = (response as { data: { results: Result[] } }).data.results;

        setSearchResultsCache({
          ...searchResultsCache,
          [debouncedQuery]: searchResults
        });

        setResults(searchResults);
      } catch (error) {
        console.log('Error fetching and parsing data', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery) {
      search();
    }
  }, [debouncedQuery, searchResultsCache]);

  return (
    <div className={classnames(styles.SearchBar, className)}>
      <div className={styles.search}>
        <h1>Search</h1>
        <input
          className={styles.bar}
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <MovieList searchResults={results} />}
    </div>
  );
}

export default memo(SearchBar);
