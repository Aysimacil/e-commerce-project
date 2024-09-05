import './Auth.css';
import loginImg from '../../assets/login.png';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';
import useAuthCalls from '../../hooks/useAuthCalls';
import { useSelector } from 'react-redux';

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const { login, signUpGoogle } = useAuthCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signGoogle = () => {
    signUpGoogle();
  };

  return (
    <>
      {loading && <Loader />}
      <section className='container auth'>
        <div className='img'>
          <img src={loginImg} alt='login' width='400px' />
        </div>
        <Card>
          <div id='form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={loginUser.email}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={loginUser.password}
                onChange={handleChange}
                required
              />
              <button className='--btn --btn-primary --btn-block' type='submit'>
                Login
              </button>
              <div className='links'>
                <Link to='/reset'>Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button className='--btn --btn-danger --btn-block' onClick={signGoogle}>
              <FaGoogle color='#fff' />
              {'   '} Login With Google
            </button>
            <span className='register'>
              <p>
                Don&#39;t have an account ? <Link to='/register'>Register</Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
