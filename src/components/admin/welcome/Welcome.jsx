import { useSelector } from 'react-redux';
import './Welcome.css';

const Welcome = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div className='welcome-message'>
      <h2>Welcome to Admin Panel</h2>
      <p>E-Commerce Admin Panel</p>
      {currentUser && (
        <p>
          You are logged in as <strong>{currentUser?.displayName}</strong>.
        </p>
      )}
      <p>Manage your products, orders, and settings to keep your e-commerce running smoothly.</p>
    </div>
  );
};

export default Welcome;
