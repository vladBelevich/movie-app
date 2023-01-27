function createMovieItem(movie) {
  return {
    key: movie.id,
    imgPath: movie.poster_path,
    title: movie.title,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
    overview: movie.overview,
    genres: movie.genre_ids,
    vote: movie.rating,
  };
}

export default createMovieItem;
