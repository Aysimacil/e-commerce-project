import { useDispatch } from 'react-redux';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../features/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const useCheckoutCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutSubmit = (shippingAddress, billingAddress) => {
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate('/checkout');
  };
  return { checkoutSubmit };
};

export default useCheckoutCalls;
