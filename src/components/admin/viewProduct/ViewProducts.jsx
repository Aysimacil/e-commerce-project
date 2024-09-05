import './ViewProducts.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../loader/Loader';
import Search from '../../search/Search';
import useProductCalls from '../../../hooks/useProductCalls';
import { useSelector } from 'react-redux';
import Notiflix from 'notiflix';

const ViewProducts = () => {
  const { getAllProducts, deleteProduct } = useProductCalls();
  const [search, setSearch] = useState('');
  const { products, loading } = useSelector((state) => state.product);
  const filteredProducts = products;
  const currentProducts = products;

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log('Delete canceled');
      },
      {
        width: '350px',
        titleColor: 'orangered',
        borderRadius: '5px',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      }
    );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className='table'>
        <h2>All Products</h2>

        <div className='search'>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imageURL} alt={name} style={{ width: '100px' }} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className='icons'>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color='red'
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
