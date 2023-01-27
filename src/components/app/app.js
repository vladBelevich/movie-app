import FilmSearch from '../services/film-search/film-search';
import { Component } from 'react';
import { DatePicker } from 'antd';
import './app.css';

export default class App extends Component {
  state = {};

  render() {
    const request = new FilmSearch();

    request.getMoviesSearch('st').then((r) => console.log(r));
    return (
      <div className='movie-app'>
        <DatePicker />
      </div>
    );
  }
}
