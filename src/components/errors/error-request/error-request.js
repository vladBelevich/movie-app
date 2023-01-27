import { Alert } from 'antd';
import './error-request.css';

function ErrorRequest() {
  return (
    <Alert
      className='error-request'
      message='Error'
      showIcon
      description='Failed to find movies. Please, try another name.'
      type='error'
    />
  );
}

export default ErrorRequest;
