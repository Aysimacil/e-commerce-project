import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
} from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const useCartCalls = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  const cartItemsObserver = () => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const checkout = () => {
    if (currentUser) {
      navigate('/checkout-details');
    } else {
      navigate('/login');
    }
  };
  const checkoutCartItems = () => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  return {
    addToCart,
    decreaseCart,
    increaseCart,
    removeFromCart,
    clearCart,
    cartItemsObserver,
    checkout,
    checkoutCartItems,
  };
};

export default useCartCalls;
