import axios from 'axios';

import { apiRoutes } from '../data/data';

export const getTopMovies = async (page: number = 1) => {
  const response = await axios.get(`${apiRoutes.topMoviesURL + page}`);
  console.log('api');
  return response.data.results;
};

export const getPopularMovies = async (page: number = 1) => {
  const response = await axios.get(`${apiRoutes.popularURL + page}`);
  return response.data.results;
};

export const getMovieBySearch = async (search: string, page: number = 1) => {
  const response = await axios.get(`${apiRoutes.searchURL + search + '&page=' + page + '&include_adult=true'}`);
  return response.data.results;
};
