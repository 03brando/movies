export const apiRoutes = {
  topMoviesURL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=`,
  posterPathURL: 'https://image.tmdb.org/t/p/original',
  searchURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=`,
  popularURL: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=`,
  movieByIdURL: `https://api.themoviedb.org/3/movie/`,
  genreURL: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
  genreByIdURL: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=`
};

export const homePage = {
  headTitle: 'Cinematic Index | Home',
  title: 'Popular Movies',
  listType: 'popular'
};

export const topPage = {
  headTitle: 'Cinematic Index | Top Movies',
  title: 'Top Rated Movies',
  listType: 'top'
};

export const searchPage = {
  headTitle: 'Cinematic Index | Search',
  title: 'Search Results',
  listType: 'search'
};

export const moviePage = {
  route: '/movies/'
};

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Top Movies', path: '/top' },
  { name: 'Genres', path: '/genres' },
  { name: 'Search', path: '/search' }
];

export const genrePage = {
  headTitle: 'Cinematic Index | Genres',
  title: 'Genres',
  route: '/genres/'
};
