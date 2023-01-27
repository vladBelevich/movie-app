function getListOfGenres(genresList, genresOfMovie) {
  const newArr = [];
  genresList.forEach((genresListElement) => {
    genresOfMovie.forEach((genresOfMoviesId) => {
      if (genresListElement.id === genresOfMoviesId) {
        newArr.push(genresListElement.name);
      }
    });
  });
  return newArr;
}

export default getListOfGenres;
