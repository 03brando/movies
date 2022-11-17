import axios from 'axios';

import { apiRoutes } from '../data/data';

export const api = axios.create({});

export const getTopMovies = async (page: number = 1) => {
  const response = await api.get(`${apiRoutes.topMoviesURL + page}`);
  return response.data.results;
};
