export default class FilmSearch {
  apiBase = 'https://api.themoviedb.org/3';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getMoviesSearch(query, page = 1) {
    return this.getResource(
      `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=${page}`
    );
  }

  async getGenres() {
    return this.getResource(
      `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
  }

  async getGuestSession() {
    return this.getResource(
      `/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
    );
  }

  async rateFilm(guestSessionId, movieId, rateValue) {
    await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: rateValue }),
      }
    );
  }
}
