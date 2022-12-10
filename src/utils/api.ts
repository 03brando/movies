import axios from 'axios';

import { apiRoutes } from '../data/data';

export const getTopMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(apiRoutes.topMoviesURL, {
      params: {
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getPopularMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(apiRoutes.popularURL, {
      params: {
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
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
    console.error(error + ' redirecting to home');
  }
};

export const getRecommended = async (id: number) => {
  try {
    const response = await axios.get(apiRoutes.movieByIdURL + id + '/recommendations', {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMovieBySearch = async (search: string, page: number = 1, adultFilter: boolean = true) => {
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
    return error;
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(apiRoutes.genreURL);
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMoviesByGenre = async (genreId: number, pageNumber: number = 1) => {
  try {
    const url = apiRoutes.genreByIdURL + genreId + '&page=' + pageNumber;
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log('Error fetching and parsing data', error);
  }
};
