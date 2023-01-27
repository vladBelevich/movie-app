import './card-list.css';
import Card from '../card';
import Spinner from '../spinner';
import ErrorData from '../errors/error-data';
import ErrorNetwork from '../errors/error-network';
import ErrorRequest from '../errors/error-request';
import { Offline } from 'react-detect-offline';
import { Row } from 'antd';

function CardList({
  data,
  loading,
  errorData,
  noResults,
  guestID,
  innerWidth,
}) {
  const elements = data.map((el) => (
    <Card
      key={el.key}
      id={el.key}
      imgPath={el.imgPath}
      title={el.title}
      voteAverage={el.voteAverage}
      releaseDate={el.releaseDate}
      overview={el.overview}
      genres={el.genres}
      vote={el.vote}
      guestID={guestID}
      innerWidth={innerWidth}
    />
  ));

  const hasData = !(loading || errorData || noResults);

  const errorView = errorData ? <ErrorData /> : null;
  const spinner = loading ? <Spinner /> : null;
  const cardListView = hasData ? elements : null;
  const errorRequest = noResults ? <ErrorRequest /> : null;

  return (
    <Row justify='space-around'>
      <Offline>
        <ErrorNetwork />
      </Offline>
      {cardListView}
      {spinner}
      {errorView}
      {errorRequest}
    </Row>
  );
}

export default CardList;
