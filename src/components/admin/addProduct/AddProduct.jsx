import './AddProduct.css';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductCalls from '../../../hooks/useProductCalls';
import { useSelector } from 'react-redux';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Phone' },
];

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

const AddProduct = () => {
  const { loading, products } = useSelector((state) => state.product);
  const { id } = useParams();
  const productEdit = products.find((item) => item.id === id);
  const { addImageToStorage, addProductToDb, editProductAtDb } = useProductCalls();

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  function detectForm(id, f1, f2) {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    addImageToStorage(file, setUploadProgress, product, setProduct);
  };

  const addProduct = (e) => {
    e.preventDefault();
    addProductToDb(product);
    setUploadProgress(0);
    setProduct({ ...initialState });
  };

  const editProduct = (e) => {
    e.preventDefault();
    editProductAtDb(id, product, productEdit);
  };

  return (
    <>
      {loading && <Loader />}
      <div className='product'>
        <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
        <Card cardClass='card'>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name:</label>
            <input
              type='text'
              placeholder='Product name'
              required
              name='name'
              value={product.name}
              onChange={handleInputChange}
            />

            <label>Product image:</label>
            <Card cardClass='group'>
              {uploadProgress === 0 ? null : (
                <div className='progress'>
                  <div className='progress-bar' style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type='file'
                accept='image/*'
                placeholder='Product Image'
                name='image'
                onChange={handleImageChange}
              />

              {product.imageURL === '' ? null : (
                <input
                  type='text'
                  placeholder='Image URL'
                  name='imageURL'
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Product price:</label>
            <input
              type='number'
              placeholder='Product price'
              required
              name='price'
              value={product.price}
              onChange={handleInputChange}
            />

            <label>Product Category:</label>
            <select required name='category' value={product.category} onChange={handleInputChange}>
              <option value='' disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type='text'
              placeholder='Product brand'
              required
              name='brand'
              value={product.brand}
              onChange={handleInputChange}
            />

            <label>Product Description</label>
            <textarea
              name='desc'
              required
              value={product.desc}
              onChange={handleInputChange}
              cols='30'
              rows='10'
            ></textarea>

            <button className='--btn --btn-primary'>
              {detectForm(id, 'Save Product', 'Edit Product')}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
