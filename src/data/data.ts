export const homePage = {
  url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=`,
  title: 'Top Rated Movies'
};

export const movieList = {
  url: 'https://image.tmdb.org/t/p/original'
};
