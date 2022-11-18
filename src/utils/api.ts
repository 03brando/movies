import axios from 'axios';

import { apiRoutes } from '../data/data';

export const getTopMovies = async (page: number = 1) => {
  console.log('getTopMovies called on page: ', page);
  const response = await axios.get(`${apiRoutes.topMoviesURL + page}`);
  return response.data;
};

export const getPopularMovies = async (page: number = 1) => {
  console.log('getPopularMovies called page number: ', page);
  const response = await axios.get(`${apiRoutes.popularURL + page}`);
  return response.data;
};

export const getMovieBySearch = async (search: string, page: number = 1, adultFilter: boolean = true) => {
  console.log('getMovieBySearch called with search: ', search);
  const response = await axios.get(
    `${apiRoutes.searchURL + search + '&page=' + page + '&include_adult=' + adultFilter}`
  );
  return response.data;
};
