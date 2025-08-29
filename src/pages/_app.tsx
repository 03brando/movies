import Layout from '../components/Layout/Layout';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { getJson } from '@/utils/http';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (key: string | [string, Record<string, unknown>]) =>
          Array.isArray(key) ? getJson(key[0], key[1]) : getJson(key),
        dedupingInterval: 2000,
        revalidateOnFocus: false
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
