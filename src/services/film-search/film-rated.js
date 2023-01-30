export default class FilmRated {
  apiBase = 'https://api.themoviedb.org/3';

  async getRatedData(guestSessionId) {
    const res = await fetch(
      `${this.apiBase}/guest_session/${guestSessionId}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`Could not fetch Rate Data, received ${res.status}`);
    }
    return res.json();
  }
}
