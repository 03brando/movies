import React, { memo } from 'react';

import styles from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default memo(LoadingSpinner);
