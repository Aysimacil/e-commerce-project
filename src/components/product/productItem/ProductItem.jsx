import './ProductItem.css';
import { Link } from 'react-router-dom';
import Card from '../../card/Card';
import useCartCalls from '../../../hooks/useCartCalls';

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const { addToCart } = useCartCalls();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? 'product-item-grid' : 'product-list-list'}>
      <Link to={`/product-details/${id}`}>
        <div className='product-item-img'>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className='product-item-content'>
        <div className='product-item-details'>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className='desc'>{shortenText(desc, 120)}</p>}

        <button className='--btn --btn-danger' onClick={() => addToCart(product)}>
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
