import axios from 'axios';

import { apiRoutes } from '../data/data';

export const getTopMovies = async (page: number = 1) => {
  console.log('getTopMovies called on page: ', page);
  try {
    const response = await axios.get(apiRoutes.topMoviesURL, {
      params: {
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies = async (page: number = 1) => {
  console.log('getPopularMovies called page number: ', page);
  try {
    const response = await axios.get(apiRoutes.popularURL, {
      params: {
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async (id: number) => {
  try {
    const response = await axios.get(apiRoutes.movieByIdURL + id, {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieBySearch = async (search: string, page: number = 1, adultFilter: boolean = true) => {
  console.log('getMovieBySearch called with search: ', search);
  try {
    const response = await axios.get(apiRoutes.searchURL, {
      params: {
        query: search,
        page: page,
        include_adult: adultFilter
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
