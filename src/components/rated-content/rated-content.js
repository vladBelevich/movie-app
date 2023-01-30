import CardList from '../card-list';
import { Layout, Row, Pagination } from 'antd';

import './rated-content.css';
import { Component } from 'react';

export default class RatedContent extends Component {
  state = {};

  render() {
    const { dataRated, guestID, setPage, innerWidth } = this.props;

    const { Content } = Layout;
    const hide = true;
    const responsive = true;

    return (
      <Content>
        <CardList
          data={dataRated.dataLoadedRated}
          loading={dataRated.loading}
          errorData={dataRated.errorData}
          noResults={dataRated.noResults}
          guestID={guestID}
          innerWidth={innerWidth}
        />
        <Row className='pagination-wrapper' justify='center'>
          <Pagination
            hideOnSinglePage={hide}
            total={dataRated.totalResults}
            onChange={setPage}
            current={dataRated.page}
            responsive={responsive}
            defaultPageSize={20}
          />
        </Row>
      </Content>
    );
  }
}
