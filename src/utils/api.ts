import axios from 'axios';

import { apiRoutes } from '../data/data';

export const api = axios.create({});

export const getTopMovies = async (page: number = 1) => {
  const response = await api.get(`${apiRoutes.topMoviesURL + page}`);
  console.log(apiRoutes.searchURL);
  return response.data.results;
};

export const getMovieBySearch = async (search: string, page: number = 1) => {
  const response = await api.get(`${apiRoutes.searchURL + search + searchPage()}`);
  return response.data.results;
};

export const searchPage = (page: number = 1) => {
  return `&page=${page}&include_adult=true`;
};
