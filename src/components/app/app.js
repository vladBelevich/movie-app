import FilmSearch from '../../services/film-search/film-search';
import FilmRated from '../../services/film-search/film-rated';
import createMovieItem from '../../services/create-movie-data/create-movie-item';

import HeaderTab from '../tabs';
import { AppProvider } from '../app-context';
import 'antd/dist/reset.css';
import './app.css';
import { debounce } from 'lodash';

import { Component } from 'react';

export default class App extends Component {
  Searching = new FilmSearch();

  FilmRatedService = new FilmRated();

  state = {
    dataSearch: {
      dataLoadedSearched: [],
      page: 1,
    },
    dataRated: {
      dataLoadedRated: [],
      page: 1,
    },
  };

  componentDidMount() {
    this.Searching.getGenres().then((res) => {
      this.setState({ genresList: res.genres });
    });
    this.Searching.getGuestSession().then((res) => {
      this.setState({ guestID: res.guest_session_id });
    });
    this.setState({ innerWidth: window.innerWidth });
    window.addEventListener('resize', (e) => {
      this.setState({ innerWidth: e.currentTarget.innerWidth });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const state = this.state;
    const { page } = state.dataSearch;
    const { searchValue } = state;

    if (
      // eslint-disable-next-line react/destructuring-assignment
      prevState.searchValue !== searchValue ||
      // eslint-disable-next-line react/destructuring-assignment
      prevState.dataSearch.page !== page
    ) {
      // eslint-disable-next-line react/destructuring-assignment
      this.loadMovies(state.searchValue, state.dataSearch.page);
    }
  }

  onChangeSearch = debounce((e) => {
    if (e.target.value === '') {
      return this.setState({
        dataSearch: {
          dataLoadedSearched: [],
          errorData: false,
          noResults: false,
          page: 1,
          totalResults: 0,
        },
      });
    }
    return this.setState({
      dataSearch: {
        loading: true,
        noResults: false,
        page: 1,
        dataLoadedSearched: [],
      },
      searchValue: e.target.value,
    });
  }, 500);

  setData(res) {
    this.setState(() => {
      const newArr = [];
      if (res.total_results === 0) {
        return { dataSearch: { noResults: true, loading: false } };
      }
      const results = res.results;
      results.forEach((el) => {
        const item = createMovieItem(el);
        newArr.push(item);
      });
      return {
        dataSearch: {
          dataLoadedSearched: newArr,
          loading: false,
          errorData: false,
          noResults: false,
          totalResults: res.total_results,
          page: res.page,
        },
      };
    });
  }

  loadRatedMovies = (guestID) => {
    this.setState({
      dataRated: {
        dataLoadedRated: [],
        loading: true,
      },
    });
    this.FilmRatedService.getRatedData(guestID).then((res) => {
      this.setState(() => {
        const newArr = [];
        const results = res.results;
        results.forEach((el) => {
          const item = createMovieItem(el);
          newArr.push(item);
        });
        return {
          dataRated: {
            dataLoadedRated: newArr,
            loading: false,
            errorData: false,
            noResults: false,
            totalResults: res.total_results,
            page: res.page,
          },
        };
      });
    });
  };

  setPage = (pageNumber) => {
    this.setState({
      dataSearch: {
        page: pageNumber,
        dataLoadedSearched: [],
        loading: true,
      },
    });
  };

  loadMovies(searchValue, page) {
    this.Searching.getMoviesSearch(searchValue, page)
      .then((res) => this.setData(res))
      .catch(() => {
        this.setState({
          dataSearch: {
            errorData: true,
            loading: false,
            noResults: false,
          },
        });
      });
  }

  render() {
    const { dataSearch, genresList, dataRated, guestID, innerWidth } =
      this.state;
    return (
      <div className='container'>
        <AppProvider value={genresList}>
          <HeaderTab
            setPage={this.setPage}
            dataRated={dataRated}
            dataSearch={dataSearch}
            onChangeSearch={this.onChangeSearch}
            guestID={guestID}
            loadRatedMovies={this.loadRatedMovies}
            innerWidth={innerWidth}
          />
        </AppProvider>
      </div>
    );
  }
}
