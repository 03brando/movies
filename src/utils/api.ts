import axios from 'axios';

import { apiRoutes } from '../data/data';

export const topMovies = axios.create({
  baseURL: apiRoutes.topMovies
});

export const getTopMovies = async (page: number = 1) => {
  const response = await topMovies.get(`${page}`);
  return response.data.results;
};
