import { memo } from 'react';
import NextHead from 'next/head';

function Head() {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>Movie Database | Home</title>
      <meta name="description" content="Movie Database" />
    </NextHead>
  );
}

export default memo(Head);
