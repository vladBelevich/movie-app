import Search from '../search';
import CardList from '../card-list';
import { Layout, Row, Pagination } from 'antd';

import './search-content.css';

function SearchContent({
  setPage,
  totalResults,
  currentPage,
  data,
  loading,
  errorData,
  noResults,
  onChangeSearch,
  addRatedItem,
  guestID,
}) {
  const { Content } = Layout;
  const hide = true;
  const responsive = true;
  return (
    <Content>
      <Search onChangeSearch={onChangeSearch} />
      <CardList
        data={data}
        loading={loading}
        errorData={errorData}
        noResults={noResults}
        addRatedItem={addRatedItem}
        guestID={guestID}
      />
      <Row className='pagination-wrapper' justify='center'>
        <Pagination
          hideOnSinglePage={hide}
          total={totalResults}
          onChange={setPage}
          current={currentPage}
          responsive={responsive}
          defaultPageSize={20}
        />
      </Row>
    </Content>
  );
}

export default SearchContent;
