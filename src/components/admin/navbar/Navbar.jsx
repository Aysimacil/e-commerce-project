import './Navbar.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const activeLink = ({ isActive }) => (isActive ? 'admin-nav-active' : '');

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className='navbar'>
      <div className='navbar-user'>
        <FaUserCircle size={40} color='#fff' />
        <h4>{currentUser?.displayName}</h4>
      </div>
      <nav className='nav-menu'>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/all-products' className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product/ADD' className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
