import { Alert } from 'antd';
import './error-data.css';

function ErrorData() {
  return (
    <Alert
      className='error-data'
      message='Error'
      showIcon
      description='Failed to load data. Please, try later.'
      type='error'
    />
  );
}

export default ErrorData;
