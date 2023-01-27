import SearchContent from '../search-content';
import RatedContent from '../rated-content';
import { Tabs } from 'antd';

import './tabs.css';

function HeaderTab({
  setPage,
  dataSearch,
  dataRated,
  onChangeSearch,
  guestID,
  loadRatedMovies,
  innerWidth,
}) {
  return (
    <Tabs
      onChange={() => loadRatedMovies(guestID)}
      defaultActiveKey='1'
      centered
      items={[
        {
          label: 'Search',
          key: '1',
          children: (
            <SearchContent
              setPage={setPage}
              dataSearch={dataSearch}
              onChangeSearch={onChangeSearch}
              guestID={guestID}
              innerWidth={innerWidth}
            />
          ),
        },
        {
          label: 'Rated',
          key: '2',
          children: (
            <RatedContent
              guestID={guestID}
              setPage={setPage}
              dataRated={dataRated}
              innerWidth={innerWidth}
            />
          ),
        },
      ]}
    />
  );
}

export default HeaderTab;
