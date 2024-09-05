import { useState } from 'react';
import './CheckoutForm.css';
import Card from '../card/Card';
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import spinnerImg from '../../assets/spinner.jpg';
import useOrderCalls from '../../hooks/useOrderCalls';
import { useSelector } from 'react-redux';

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const { saveOrder } = useOrderCalls();
  const { loading } = useSelector((state) => state.order);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage('Payment successful');
    saveOrder();
  };

  return (
    <section>
      <div className='container checkout-form'>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass='card'>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass='card pay'>
              <h3>Price Checkout</h3>
              <button disabled={loading} id='submit' className='button'>
                <span id='button-text'>
                  {loading ? (
                    <img src={spinnerImg} alt='Loading...' style={{ width: '20px' }} />
                  ) : (
                    'Pay now'
                  )}
                </span>
              </button>
              {message && <div id='payment-message'>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
