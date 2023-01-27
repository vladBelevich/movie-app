import './error-network.css';
import { Alert } from 'antd';

function ErrorNetwork() {
  return (
    <div className='error-network'>
      <Alert
        className='error-network__modal'
        message='Error'
        showIcon
        description='Failed to load anything. Please, check your network.'
        type='error'
      />
    </div>
  );
}

export default ErrorNetwork;
