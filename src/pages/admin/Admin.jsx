import './Admin.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/admin/navbar/Navbar';
import Home from '../../components/admin/home/Home';
import Orders from '../../components/admin/orders/Orders';
import OrderDetails from '../../components/admin/orderDetails/OrderDetails';
import AddProduct from '../../components/admin/addProduct/AddProduct';
import ViewProducts from '../../components/admin/viewProduct/ViewProducts';
import Welcome from '../../components/admin/welcome/Welcome';

const Admin = () => {
  return (
    <div className='admin'>
      <div className='admin-navbar'>
        <Navbar />
      </div>
      <div className='admin-content'>
        <Routes>
          <Route path='' element={<Welcome />} />
          <Route path='home' element={<Home />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order-details/:id' element={<OrderDetails />} />
          <Route path='add-product/:id' element={<AddProduct />} />
          <Route path='all-products' element={<ViewProducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
