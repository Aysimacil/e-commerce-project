import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Product.css';
import spinnerImg from '../../assets/spinner.jpg';
import { FaCogs } from 'react-icons/fa';
import useProductCalls from '../../hooks/useProductCalls';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';

const Product = () => {
  const { getAllProducts } = useProductCalls();
  const [showFilter, setShowFilter] = useState(false);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    getAllProducts();
  }, []);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container product-main`}>
        <aside className={showFilter ? `filter show` : `filter`}>
          {!loading && <ProductFilter />}
        </aside>
        <div className='product-main-content'>
          {loading ? (
            <img
              src={spinnerImg}
              alt='Loading..'
              style={{ width: '50px' }}
              className='--center-all'
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className='product-main-icon' onClick={toggleFilter}>
            <FaCogs size={20} color='orangered' />
            <p>
              <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
