export const routes = {
  home: '/',
  top: '/top',
  genres: '/genres',
  search: '/search',
  movie: (id: number | string) => `/movies/${id}`,
  genre: (id: number | string) => `/genres/${id}`
};

export const navLinks = [
  { name: 'Home', path: routes.home },
  { name: 'Top Movies', path: routes.top },
  { name: 'Genres', path: routes.genres },
  { name: 'Search', path: routes.search }
];


