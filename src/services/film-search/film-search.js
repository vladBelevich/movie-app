export default class FilmSearch {
  apiBase = 'https://api.themoviedb.org/3';

  apiKey = 'api_key=9798ba2b63905bd2cfcb37563bd3ad01';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getMoviesSearch(query, page = 1) {
    return this.getResource(
      `/search/movie?${this.apiKey}&query=${query}&page=${page}`
    );
  }

  async getGenres() {
    return this.getResource(`/genre/movie/list?${this.apiKey}`);
  }

  async getGuestSession() {
    return this.getResource(`/authentication/guest_session/new?${this.apiKey}`);
  }

  async rateFilm(guestSessionId, movieId, rateValue) {
    await fetch(
      `${this.apiBase}/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: rateValue }),
      }
    );
  }
}
