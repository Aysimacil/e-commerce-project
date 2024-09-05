import './Cart.css';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useSelector } from 'react-redux';
import useCartCalls from '../../hooks/useCartCalls';
import { useEffect } from 'react';

const Cart = () => {
  const { decreaseCart, increaseCart, removeFromCart, clearCart, cartItemsObserver, checkout } =
    useCartCalls();
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    cartItemsObserver();
  }, [cartItems]);

  return (
    <section>
      <div className='container table'>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to='/#products'>&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: '100px' }} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className='count'>
                          <button className='--btn' onClick={() => decreaseCart(cart)}>
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn' onClick={() => increaseCart(cart)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className='icons'>
                        <FaTrashAlt size={19} color='red' onClick={() => removeFromCart(cart)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='summary-cart'>
              <button className='--btn --btn-danger' onClick={() => clearCart()}>
                Clear Cart
              </button>
              <div className='checkout-cart'>
                <div>
                  <Link to='/#products'>&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass='card-cart'>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className='text'>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button className='--btn --btn-primary --btn-block' onClick={() => checkout()}>
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
