import NextHead from 'next/head';
import { memo } from 'react';

export type Props = {
  title: string;
};

function Head({ title }: Props) {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{title}</title>
      <meta name="description" content="Movie Database" />
    </NextHead>
  );
}

export default memo(Head);
