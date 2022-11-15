import { memo } from 'react';
import classnames from 'classnames';

import styles from './MovieList.module.scss';

export type Props = {
  className?: string;
};

function MovieList({ className }: Props) {
  return <div className={classnames(styles.MovieList, className)}>MovieList component</div>;
}

export default memo(MovieList);
