import classnames from 'classnames';
import { useEffect, useState } from 'react';

import { searchPage } from '../../data/data';
import { ListType, Result } from '../../data/interfaces';
import { getMovieBySearch } from '../../utils/api';
import MovieList from '../MovieList/MovieList';
import styles from './SearchBar.module.scss';

// Define the props type for the SearchBar component
type Props = {
  className?: string;
};

const lt = searchPage.listType as ListType;

function SearchBar({ className }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function search() {
      try {
        const response = await getMovieBySearch(query);
        setResults(response.data.results);
      } catch (error) {
        console.log('Error fetching and parsing data', error);
      }
    }

    if (query) {
      search();
    }
  }, [query]);

  return (
    <div className={classnames(styles.SearchBar, className)}>
      <div className={styles.searchBar}>
        <h1>Search</h1>
        <input
          className={styles.bar}
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <MovieList searchResults={results} />
    </div>
  );
}

export default SearchBar;
