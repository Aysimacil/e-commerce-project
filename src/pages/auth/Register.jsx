import './Auth.css';
import registerImg from '../../assets/register.png';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';
import useAuthCalls from '../../hooks/useAuthCalls';
import { toastErrorNotify } from '../../helpers/ToastNotify';
import { useSelector } from 'react-redux';

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  const { register } = useAuthCalls();
  const [registeredUser, setRegisteredUser] = useState({
    email: '',
    password: '',
    cPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisteredUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registeredUser.password !== registeredUser.cPassword) {
      toastErrorNotify('Passwords do not match');
    } else {
      register(registeredUser);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className='container auth'>
        <Card>
          <div id='form'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={registeredUser.email}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={registeredUser.password}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                placeholder='Confirm Password'
                name='cPassword'
                value={registeredUser.cPassword}
                onChange={handleChange}
                required
              />

              <button className='--btn --btn-primary --btn-block' type='submit'>
                Register
              </button>
            </form>
            <span className='register'>
              <p>
                Already have an account ? <Link to='/login'>Login</Link>
              </p>
            </span>
          </div>
        </Card>
        <div className='img'>
          <img src={registerImg} alt='register' width='400px' />
        </div>
      </section>
    </>
  );
};

export default Register;
