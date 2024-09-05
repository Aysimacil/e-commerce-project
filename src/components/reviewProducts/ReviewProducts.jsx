import './ReviewProducts.css';
import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import spinnerImg from '../../assets/spinner.jpg';
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../hooks/useFetchDocument';
import useReviewCalls from '../../hooks/useReviewCalls';

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument('products', id);
  const { submitReview } = useReviewCalls();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();

    submitReview(id, rate, review);
    setRate(0);
    setReview('');
  };

  return (
    <section>
      <div className='container review'>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt='Loading...' style={{ width: '50px' }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img src={product.imageURL} alt={product.name} style={{ width: '100px' }} />
          </>
        )}

        <Card cardClass='card'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols='30'
              rows='10'
            ></textarea>
            <button type='submit' className='--btn --btn-primary'>
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
