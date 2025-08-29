import axios from 'axios';
import { env } from '@/config/env';

export const httpClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 15000
});

httpClient.interceptors.request.use((config) => {
  const params = new URLSearchParams(config.params as Record<string, string> | undefined);
  if (!params.get('api_key')) {
    params.set('api_key', env.NEXT_PUBLIC_API_KEY);
  }
  if (!params.get('language')) {
    params.set('language', 'en-US');
  }
  return { ...config, params };
});


