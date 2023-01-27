import FilmSearch from '../../services/film-search/film-search';
import cutText from '../../services/help-service/cut-text';
import getListOfGenres from '../../services/help-service/get-list-of-genres';
import voteFix from '../../services/help-service/vote-fix';
import './card.css';
import { AppConsumer } from '../app-context';
import { format } from 'date-fns';
import { Rate, Row } from 'antd';
import { Component } from 'react';

const genresRender = (listOfGenres, className) => {
  let key = 0;
  return listOfGenres.map((genre) => {
    key += 1;
    return (
      <div key={key} className={className}>
        {genre}
      </div>
    );
  });
};

export default class Card extends Component {
  apiPoster = 'https://image.tmdb.org/t/p/original';

  FilmSearchService = new FilmSearch();

  render() {
    const {
      imgPath,
      title,
      voteAverage,
      releaseDate,
      overview,
      genres,
      addRatedItem,
      id,
      guestID,
      vote,
      innerWidth,
    } = this.props;
    const fixedGrade = voteFix(voteAverage);

    let gradeColor;
    if (fixedGrade <= 3) {
      gradeColor = 'grade-bad';
    } else if (fixedGrade > 3 && fixedGrade <= 5) {
      gradeColor = 'grade-normal';
    } else if (fixedGrade > 5 && fixedGrade <= 7) {
      gradeColor = 'grade-good';
    } else if (fixedGrade > 7) {
      gradeColor = 'grade-excellent';
    }

    let formatDate;
    if (releaseDate === '' || releaseDate === undefined) {
      formatDate = 'No data';
    } else {
      formatDate = format(
        new Date(releaseDate.replaceAll('-', ', ')),
        'MMMM dd, yyyy'
      );
    }
    let cardClass = 'card';

    if (innerWidth <= 488) {
      cardClass = 'card_mobile';
      return (
        <AppConsumer>
          {(genresList) => (
            <div className={cardClass}>
              <div className='card-info_mobile'>
                <div className='card-image_mobile'>
                  <img src={`${this.apiPoster}${imgPath}`} alt='poster' />
                </div>
                <div className='card-description_mobile'>
                  <div className='title-container_mobile'>
                    <div className='title-text_mobile'>
                      <h3>{title}</h3>
                    </div>
                    <div className={`${gradeColor} title-grade_mobile`}>
                      <span>{fixedGrade}</span>
                    </div>
                  </div>
                  <div className='card-date_mobile'>
                    <span>{formatDate}</span>
                  </div>
                  <div className='card-genres_mobile'>
                    {genresRender(
                      getListOfGenres(genresList, genres),
                      'card-genre'
                    )}
                  </div>
                </div>
              </div>
              <div className='card-overview_mobile'>
                <span role='presentation'>{cutText(overview, 200)}</span>
              </div>
              <Row justify='center'>
                <Rate
                  onChange={(value) => {
                    if (!vote) {
                      this.FilmSearchService.rateFilm(guestID, id, value);
                    }
                    return null;
                  }}
                  allowHalf
                  defaultValue='null'
                  value={vote}
                />
              </Row>
            </div>
          )}
        </AppConsumer>
      );
    }
    return (
      <AppConsumer>
        {(genresList) => (
          <div className={cardClass}>
            <div className='card-image'>
              <img src={`${this.apiPoster}${imgPath}`} alt='poster' />
            </div>
            <div className='card-info'>
              <div className='title-container'>
                <div className='title-text'>
                  <h3>{title}</h3>
                </div>
                <div className={`${gradeColor} title-grade `}>
                  <span>{fixedGrade}</span>
                </div>
              </div>
              <div className='card-date'>
                <span>{formatDate}</span>
              </div>
              <div className='card-genres'>
                {genresRender(
                  getListOfGenres(genresList, genres),
                  'card-genre'
                )}
              </div>
              <div className='card-overview'>
                <span role='presentation'>{cutText(overview, 160)}</span>
              </div>
              <div role='presentation' onClick={addRatedItem}>
                <Rate
                  onChange={(value) => {
                    if (!vote) {
                      this.FilmSearchService.rateFilm(guestID, id, value);
                    }
                    return null;
                  }}
                  allowHalf
                  defaultValue='null'
                  value={vote}
                />
              </div>
            </div>
          </div>
        )}
      </AppConsumer>
    );
  }
}
