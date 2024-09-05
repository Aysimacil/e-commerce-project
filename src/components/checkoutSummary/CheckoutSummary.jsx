import { Link } from 'react-router-dom';
import Card from '../card/Card';
import './CheckoutSummary.css';
import { useSelector } from 'react-redux';

const CheckoutSummary = () => {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className='button'>
              <Link to='/#products'>Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className='text'>
              <h4>Subtotal:</h4>
              <h3>${cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass='summary-card'>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
