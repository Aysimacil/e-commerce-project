import React, { useState, useEffect } from 'react';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
import spinnerImg from '../../assets/spinner.jpg';
import { useSelector } from 'react-redux';
import useCartCalls from '../../hooks/useCartCalls';

const Checkout = () => {
  const [dbResponse, setDbResponse] = useState(false);
  const message = 'Initializing checkout...';
  const { checkoutCartItems } = useCartCalls();
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    checkoutCartItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDbResponse(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section>
        <div className='container'>
          {!dbResponse && (
            <>
              <h2>
                <img
                  src={spinnerImg}
                  alt='Loading...'
                  style={{ width: '25px', marginRight: '15px' }}
                />
                {message}
              </h2>
              <h3>eCommerce payment</h3>
              <h4>Email: {currentUser?.email}</h4>
              <h4>Amount: {cartTotalAmount}</h4>
            </>
          )}
        </div>
      </section>
      {dbResponse && <CheckoutForm />}
    </>
  );
};

export default Checkout;
