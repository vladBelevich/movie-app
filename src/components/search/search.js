import { Input } from 'antd';
import './search.css';

function Search({ onChangeSearch }) {
  return (
    <form>
      <Input
        className='search'
        placeholder='Type to search...'
        onChange={onChangeSearch}
      />
    </form>
  );
}
export default Search;
