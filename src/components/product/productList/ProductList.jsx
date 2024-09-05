import React, { useState } from 'react';
import './ProductList.css';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import ProductItem from '../productItem/ProductItem';
import Search from '../../search/Search';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');

  const currentProducts = products;

  return (
    <div className='product-list' id='product'>
      <div className='top'>
        <div className='icons'>
          <BsFillGridFill
            size={22}
            color={grid ? '#0066d4' : 'orangered'}
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color={!grid ? '#0066d4' : 'orangered'}
            onClick={() => setGrid(false)}
          />
          <p>
            <b>{currentProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className='sort'>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `product-list-grid` : `list`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts?.map((product) => (
              <div key={product.id}>
                <ProductItem {...product} grid={grid} product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
