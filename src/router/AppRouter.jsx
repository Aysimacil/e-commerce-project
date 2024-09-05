import { Route, Routes } from 'react-router-dom';
import Header from '../components/header/Header';
import Home from '../pages/home/Home';
import Contact from '../pages/contact/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PasswordReset from '../pages/auth/PasswordReset';
import Footer from '../components/footer/Footer';
import NotFound from '../pages/notFound/NotFound';
import CheckoutDetails from '../pages/checkout/CheckoutDetails';
import Checkout from '../pages/checkout/Checkout';
import CheckoutSuccess from '../pages/checkout/CheckoutSuccess';
import OrderDetails from '../pages/orderDetails/OrderDetails';
import OrderHistory from '../pages/orderHistory/OrderHistory';
import ReviewProducts from '../components/reviewProducts/ReviewProducts';
import Admin from '../pages/admin/Admin';
import ProductDetails from '../components/product/productDetails/ProductDetails';
import Cart from '../pages/cart/Cart';
import AdminOnlyRoute from '../components/adminOnlyRoute/AdminOnlyRoute';

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<PasswordReset />} />

        <Route
          path='/admin/*'
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />

        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout-details' element={<CheckoutDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='/order-details/:id' element={<OrderDetails />} />
        <Route path='/review-product/:id' element={<ReviewProducts />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
