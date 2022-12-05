import classnames from 'classnames';
import { memo, useCallback, useState } from 'react';

import { searchPage } from '../../data/data';
import { ListType } from '../../data/interfaces';
import MovieList from '../MovieList/MovieList';
import styles from './SearchBar.module.scss';

export type Props = {
  className?: string;
};

const lt = searchPage.listType as ListType;

function SearchBar({ className }: Props) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
    setSearched(true);
  }, []);

  return (
    <div className={classnames(styles.SearchBar, className)}>
      <div className={styles.searchBar}>
        <h1>Search</h1>
        <input type="text" placeholder="Search for a movie" onChange={handleSearch} />
      </div>
      {searched && <MovieList listType={lt} searchQuery={query} />}
    </div>
  );
}

export default memo(SearchBar);
