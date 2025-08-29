import { httpClient } from '@/utils/http';

export const getTopMovies = async (page: number = 1) => {
  try {
    const response = await httpClient.get('/movie/top_rated', { params: { page } });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getPopularMovies = async (page: number = 1) => {
  try {
    const response = await httpClient.get('/movie/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMovieById = async (id: number) => {
  try {
    const response = await httpClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(error + ' redirecting to home');
  }
};

export const getRecommended = async (id: number) => {
  try {
    const response = await httpClient.get(`/movie/${id}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMovieBySearch = async (search: string, page: number = 1, adultFilter: boolean = false) => {
  try {
    const response = await httpClient.get('/search/movie', {
      params: { query: search, page, include_adult: adultFilter }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getGenres = async () => {
  try {
    const response = await httpClient.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getMoviesByGenre = async (genreId: number, pageNumber: number = 1) => {
  try {
    const response = await httpClient.get('/discover/movie', {
      params: { with_genres: genreId, page: pageNumber }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
