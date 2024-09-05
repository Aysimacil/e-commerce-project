import './Auth.css';
import resetImg from '../../assets/forgot.png';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';
import useAuthCalls from '../../hooks/useAuthCalls';
import { useSelector } from 'react-redux';

const PasswordReset = () => {
  const { loading } = useSelector((state) => state.auth);
  const { resetPassword } = useAuthCalls();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  return (
    <>
      {loading && <Loader />}
      <section className='container auth'>
        <div className='img'>
          <img src={resetImg} alt='Reset Password' width='400px' />
        </div>
        <Card>
          <div id='form'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button className='--btn --btn-primary --btn-block' type='submit'>
                Reset Password
              </button>
              <div className='links'>
                <p>
                  <Link to='/login'>- Login</Link>
                </p>
                <p>
                  <Link to='/register'>- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default PasswordReset;
