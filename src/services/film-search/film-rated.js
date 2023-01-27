export default class FilmRated {
  apiBase = 'https://api.themoviedb.org/3';

  apiKey = 'api_key=9798ba2b63905bd2cfcb37563bd3ad01';

  async getRatedData(guestSessionId) {
    const res = await fetch(
      `${this.apiBase}/guest_session/${guestSessionId}/rated/movies?${this.apiKey}`
    );
    if (!res.ok) {
      throw new Error(`Could not fetch Rate Data, received ${res.status}`);
    }
    return res.json();
  }
}
