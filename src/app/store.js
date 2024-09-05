import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import checkoutReducer from '../features/checkoutSlice';
import orderReducer from '../features/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
});
