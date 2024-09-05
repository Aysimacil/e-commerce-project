import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Cart = ({ className, cartTotalQuantity }) => (
  <span className={className}>
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={20} />
      <p>{cartTotalQuantity}</p>
    </Link>
  </span>
);

export default Cart;
