// *** Glossary for site menu filters ***
const siteMenuFiltersMap = {
  watchlist: (movies) => movies.filter((movie) => movie.inWatchlist).length,
  history: (movies) => movies.filter((movie) => movie.alreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.isFavorite).length,
};


export const generateSiteMenu = (movies) => {
  return Object.entries(siteMenuFiltersMap).map(([ filterName, countMovies ]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
