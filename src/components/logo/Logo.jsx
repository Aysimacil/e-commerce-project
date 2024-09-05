import { Link } from 'react-router-dom';
import './Logo.css';
const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/'>
        <h2>
          e<span>Commerce</span>.
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
