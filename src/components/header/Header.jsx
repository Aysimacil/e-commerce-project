import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import Cart from '../cart/Cart';
import Logo from '../logo/Logo';
import useAuthCalls from '../../hooks/useAuthCalls';
import { useSelector } from 'react-redux';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';

const Header = () => {
  const { userObserver, logout } = useAuthCalls();
  const { currentUser } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);
  const activeLink = ({ isActive }) => (isActive ? 'active' : '');

  useEffect(() => {
    userObserver();
  }, []);

  return (
    <header className='fixed'>
      <div className='header'>
        <Logo />

        <nav className={showMenu ? 'show-nav' : 'hide-nav'}>
          <div
            className={showMenu ? 'nav-wrapper show-nav-wrapper' : 'nav-wrapper'}
            onClick={hideMenu}
          />
          <ul onClick={hideMenu}>
            <li className='logo-mobile'>
              {<Logo />}
              <FaTimes size={22} color='#fff' onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to='/admin/'>
                  <button className='--btn --btn-primary'> Admin </button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to='/contact'>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div onClick={hideMenu} className='header-right'>
            <span className='links'>
              {!currentUser && (
                <NavLink className={activeLink} to='/login'>
                  Login
                </NavLink>
              )}
              {currentUser && (
                <Link to='#' style={{ color: '#ff7722' }}>
                  <FaUserCircle size={16} />
                  Hi {currentUser?.displayName}
                </Link>
              )}
              {!currentUser && (
                <NavLink className={activeLink} to='/register'>
                  Register
                </NavLink>
              )}
              {currentUser && (
                <NavLink className={activeLink} to='/order-history'>
                  My Orders
                </NavLink>
              )}
              {currentUser && (
                <NavLink to='/' onClick={logout}>
                  Logout
                </NavLink>
              )}
            </span>
            <Cart className='cart' cartTotalQuantity={cartTotalQuantity} />
          </div>
        </nav>
        <div className='menu-icon'>
          <Cart className='cart' cartTotalQuantity={cartTotalQuantity} />
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
