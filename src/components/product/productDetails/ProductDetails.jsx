import './ProductDetails.css';
import { Link, useParams } from 'react-router-dom';
import spinnerImg from '../../../assets/spinner.jpg';
import useFetchDocument from '../../../hooks/useFetchDocument';
import { useEffect, useState } from 'react';
import useCartCalls from '../../../hooks/useCartCalls';
import { useSelector } from 'react-redux';
import { AdminOnlyLink } from '../../adminOnlyRoute/AdminOnlyRoute';
import useFetchCollection from '../../../hooks/useFetchCollection';
import Card from '../../card/Card';
import StarsRating from 'react-star-rate';
import dateFormat from 'dateformat';
import TimeAgo from 'react-timeago';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const { document } = useFetchDocument('products', id);
  const { data } = useFetchCollection('reviews');
  const { addToCart, decreaseCart } = useCartCalls();
  const { cartItems } = useSelector((state) => state.cart);

  const cart = cartItems.find((item) => item.id === id);
  const isCartAdded = cartItems.findIndex((item) => item.id === id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredReviews(data.filter((review) => review.productID === id));
    }
  }, [data]);

  return (
    <section>
      <div className='container product-details'>
        <h2>Product Details</h2>
        <div>
          <Link to='/#products'>&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt='Loading' style={{ width: '50px' }} />
        ) : (
          <>
            <div className='details'>
              <div className='img'>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className='content'>
                <h3>{product.name}</h3>
                <p className='price'>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>PUID</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className='count'>
                  {isCartAdded >= 0 && (
                    <>
                      <button className='--btn' onClick={() => decreaseCart(product)}>
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button className='--btn' onClick={() => addToCart(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>

                <button className='--btn --btn-danger' onClick={() => addToCart(product)}>
                  ADD TO CART
                </button>
                <AdminOnlyLink>
                  <Link to={`/admin/add-product/${id}`}>
                    <button className='--btn --btn-primary'>EDIT PRODUCT</button>
                  </Link>
                </AdminOnlyLink>
              </div>
            </div>
          </>
        )}
        <Card cardClass='card-review'>
          <h2>Product Reviews</h2>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, displayName, reviewDate } = item;
                  return (
                    <div key={index} className='content'>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>
                          {dateFormat(reviewDate, 'dd mmm yyyy')}
                          <small> ({<TimeAgo date={reviewDate} />})</small>
                        </b>
                      </span>
                      <br />
                      <span>
                        <b>by: {displayName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
