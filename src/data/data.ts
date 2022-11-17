export const apiRoutes = {
  topMoviesURL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=`,
  posterPathURL: 'https://image.tmdb.org/t/p/original',
  searchURL: `https:/api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=`
};

export const homePage = {
  title: 'Top Rated Movies'
};
