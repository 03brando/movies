import classnames from 'classnames';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Result } from '../../data/interfaces';
import { getMovieBySearch } from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MovieList from '../MovieList/MovieList';
import styles from './SearchBar.module.scss';

// Define the props type for the SearchBar component
type Props = {
  className?: string;
};

//TODO: add styling and animation

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
        const searchResults = (response as { results: Result[] }).results;

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
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <div className={styles.searchIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              className={styles.clearButton}
              onClick={() => setQuery('')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        

      </div>

      <div className={styles.resultsContainer}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <LoadingSpinner />
            <p className={styles.loadingText}>Searching for movies...</p>
          </div>
        )}
        
        {!isLoading && query && results.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>No movies found</h3>
            <p>Try searching with different keywords or browse our popular movies</p>
          </div>
        )}
        
        {!isLoading && results.length > 0 && (
          <div className={styles.resultsHeader}>
            <h2>Found {results.length} movie{results.length !== 1 ? 's' : ''}{results.length === 20 ? '+' : ''}</h2>
          </div>
        )}
        
        {!isLoading && <MovieList searchResults={results} />}
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
