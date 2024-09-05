import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL_ADDRESS;

const AdminOnlyRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);

  if (currentUser?.email === ADMIN_EMAIL) return children;

  return (
    <section style={{ height: '75vh' }}>
      <div className='container'>
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <button className='--btn'>
          <Link to='/'>&larr; Back To Home</Link>
        </button>
      </div>
    </section>
  );
};

export default AdminOnlyRoute;

export const AdminOnlyLink = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);

  if (currentUser?.email === ADMIN_EMAIL) return children;
  return null;
};
