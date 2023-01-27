import Search from '../search';
import CardList from '../card-list';
import { Layout, Row, Pagination } from 'antd';

import './search-content.css';

function SearchContent({
  setPage,
  dataSearch,
  onChangeSearch,
  guestID,
  innerWidth,
}) {
  const { Content } = Layout;
  const hide = true;
  const responsive = true;

  return (
    <Content>
      <Search onChangeSearch={onChangeSearch} />
      <CardList
        innerWidth={innerWidth}
        data={dataSearch.dataLoadedSearched}
        loading={dataSearch.loading}
        errorData={dataSearch.errorData}
        noResults={dataSearch.noResults}
        guestID={guestID}
      />
      <Row className='pagination-wrapper' justify='center'>
        <Pagination
          hideOnSinglePage={hide}
          total={dataSearch.totalResults}
          onChange={setPage}
          current={dataSearch.page}
          responsive={responsive}
          defaultPageSize={20}
        />
      </Row>
    </Content>
  );
}

export default SearchContent;
