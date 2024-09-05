import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='links'>
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact Us</Link>
        </div>
        <div className='socialMedia'>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            Facebook
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            X
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
            Instagram
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            LinkedIn
          </a>
        </div>
        <div className='copy'>
          <p>&copy; {new Date().getFullYear()} eCommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
